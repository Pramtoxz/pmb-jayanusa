"use client"

import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { PlusCircle, MoreHorizontal, Eye, Pencil, Trash, ArrowUpDown } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Input } from "@/components/ui/input"
import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface CalonMahasiswa {
    id: string;
    nama: string;
    nik: string;
    program_studi: string;
    kelas: string;
    beasiswa: string;
    status_pembayaran: string;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Calon Mahasiswa',
        href: '/calon-mahasiswa',
    },
];

// Tambahkan fungsi untuk mendapatkan style badge
const getStatusBadgeStyle = (status: string) => {
    switch (status) {
        case 'dibayar':
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
        case 'menunggu':
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
        case 'ditolak':
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
};

const getKelasBadgeStyle = (beasiswa: string, kelas: string | null) => {
    if (beasiswa === 'iya') {
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
    return kelas === 'reguler' 
        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
        : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
};

const columns: ColumnDef<CalonMahasiswa>[] = [
    {
        accessorKey: "nik",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    NIK
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "nama",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "program_studi",
        header: "Program Studi",
    },
    {
        accessorKey: "kelas",
        header: "Kelas",
        filterFn: (row, id, value) => {
            if (!value || value === 'all') return true;
            if (value === 'beasiswa') return row.original.beasiswa === 'iya';
            return row.original.kelas === value;
        },
        cell: ({ row }) => {
            const siswa = row.original;
            let text = '';
            
            if (siswa.beasiswa === 'iya') {
                text = 'KIP-Kuliah';
            } else {
                text = siswa.kelas === 'reguler' ? 'Reguler' : 'Kelas Kerja';
            }
            
            return (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getKelasBadgeStyle(siswa.beasiswa, siswa.kelas)}`}>
                    {text}
                </span>
            )
        },
    },
    {
        accessorKey: "status_pembayaran",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status_pembayaran") as string
            return (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeStyle(status)}`}>
                    {status}
                </span>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: "Tanggal Daftar",
        filterFn: (row, id, value) => {
            if (!value) return true;
            const year = new Date(row.getValue(id)).getFullYear();
            return year.toString() === value;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const siswa = row.original

            // Handle delete
            const handleDelete = () => {
                if (confirm('Apakah anda yakin ingin menghapus data ini?')) {
                    router.delete(`/calon-mahasiswa/${siswa.id}`, {
                        onSuccess: () => {
                            toast.success('Data berhasil dihapus');
                        },
                        onError: () => {
                            toast.error('Gagal menghapus data');
                        },
                    });
                }
            };

            // Handle edit
            const handleEdit = () => {
                router.get(`/calon-mahasiswa/${siswa.id}/edit`);
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Buka menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.get(`/calon-mahasiswa/${siswa.id}`)}>
                            <Eye className="mr-2 h-4 w-4 text-blue-600" />
                            Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit()}>
                            <Pencil className="mr-2 h-4 w-4 text-yellow-600" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            onClick={() => handleDelete()}
                            className="text-red-600"
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function CalonMahasiswa({ calonMahasiswa }: { calonMahasiswa: CalonMahasiswa[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    
    // Dapatkan tahun unik dari data
    const uniqueYears = React.useMemo(() => {
        const years = calonMahasiswa.map(siswa => 
            new Date(siswa.created_at).getFullYear()
        );
        return Array.from(new Set(years)).sort((a, b) => b - a); // Sort descending
    }, [calonMahasiswa]);

    const table = useReactTable({
        data: calonMahasiswa,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Calon Mahasiswa" />
            <Toaster />
            <div className="flex h-full flex-1 flex-col space-y-8 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Daftar Calon Mahasiswa</h2>
                        <p className="text-muted-foreground">
                            Kelola data calon mahasiswa baru di sini
                        </p>
                    </div>
                    <Button onClick={() => router.get('/calon-mahasiswa/create')}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah Baru
                    </Button>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Input
                            placeholder="Cari berdasarkan nama..."
                            value={(table.getColumn("nama")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("nama")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                        
                        <Select
                            onValueChange={(value) => {
                                if (value === "all") {
                                    table.getColumn("created_at")?.setFilterValue("");
                                } else {
                                    table.getColumn("created_at")?.setFilterValue(value);
                                }
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Tahun</SelectItem>
                                {uniqueYears.map((year) => (
                                    <SelectItem key={year} value={year.toString()}>
                                        Tahun {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            onValueChange={(value) => {
                                table.getColumn("kelas")?.setFilterValue(value);
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter Kelas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Kelas</SelectItem>
                                <SelectItem value="reguler">Reguler</SelectItem>
                                <SelectItem value="kerja">Kelas Kerja</SelectItem>
                                <SelectItem value="beasiswa">KIP-Kuliah</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="text-sm text-muted-foreground">
                            {table.getFilteredRowModel().rows.length} data ditemukan
                        </div>
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        Tidak ada data
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="text-sm text-muted-foreground">
                        {table.getFilteredRowModel().rows.length} data ditemukan
                    </div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious 
                                    onClick={() => table.previousPage()} 
                                    className={!table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                    aria-disabled={!table.getCanPreviousPage()}
                                />
                            </PaginationItem>
                            {Array.from({ length: table.getPageCount() }, (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        onClick={() => table.setPageIndex(i)}
                                        isActive={table.getState().pagination.pageIndex === i}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext 
                                    onClick={() => table.nextPage()} 
                                    className={!table.getCanNextPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                    aria-disabled={!table.getCanNextPage()}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </AppLayout>
    );
} 