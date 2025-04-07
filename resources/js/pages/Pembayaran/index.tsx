import { Head, router } from '@inertiajs/react';
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
} from "@/components/ui/dropdown-menu"
import { Eye, MoreHorizontal, ArrowUpDown } from 'lucide-react';
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
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface Pembayaran {
    id: number;
    kode: string;
    nama: string;
    nik: string;
    jumlah: number;
    status: string;
    bukti: string | null;
    skl: string | null;
    rapor: string | null;
    keterangan: string | null;
    tanggal: string;
    suratlulus: string | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pembayaran',
        href: '/pembayaran',
    },
];

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

export default function Pembayaran({ pembayaran }: { pembayaran: Pembayaran[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const columns: ColumnDef<Pembayaran>[] = [
        {
            accessorKey: "kode",
            header: ({ column }) => {
                return (
                    <div
                        className="flex items-center space-x-1 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Kode</span>
                        <ArrowUpDown className="h-4 w-4" />
                    </div>
                )
            },
        },
        {
            accessorKey: "nama",
            header: ({ column }) => {
                return (
                    <div
                        className="flex items-center space-x-1 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Nama</span>
                        <ArrowUpDown className="h-4 w-4" />
                    </div>
                )
            },
        },
        {
            accessorKey: "nik",
            header: "NIK",
        },
        {
            accessorKey: "jumlah",
            header: "Jumlah",
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("jumlah"));
                const formatted = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR"
                }).format(amount);

                return <span className="font-medium text-green-700 dark:text-green-500">{formatted}</span>;
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full inline-flex items-center ${getStatusBadgeStyle(status)}`}>
                        {status === 'dibayar' && <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5"></path>
                        </svg>}
                        {status === 'menunggu' && <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>}
                        {status === 'ditolak' && <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>}
                        {status}
                    </span>
                );
            },
        },
        {
            accessorKey: "tanggal",
            header: ({ column }) => {
                return (
                    <div
                        className="flex items-center space-x-1 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>Tanggal</span>
                        <ArrowUpDown className="h-4 w-4" />
                    </div>
                )
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const payment = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <span className="sr-only">Buka menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="shadow-md border-gray-200 dark:border-gray-700">
                            <DropdownMenuLabel className="text-xs text-gray-500 dark:text-gray-400">Aksi</DropdownMenuLabel>
                            
                            <DropdownMenuItem 
                                onSelect={(e) => {
                                    e.preventDefault();
                                    router.get(`/pembayaran/${payment.id}`);
                                }}
                                className="flex items-center text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                                <Eye className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Lihat Detail
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ];

    const table = useReactTable({
        data: pembayaran,
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
            <Head title="Konfirmasi Pembayaran" />
            <Toaster />
            <div className="flex h-full flex-1 flex-col space-y-8 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Konfirmasi Pembayaran</h2>
                        <p className="text-muted-foreground">
                            Kelola dan konfirmasi pembayaran mahasiswa baru
                        </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <div className="hidden md:flex items-center space-x-1.5 text-sm">
                            <div className="flex items-center">
                                <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-1.5"></span>
                                <span className="text-gray-600 dark:text-gray-300">
                                    {table.getFilteredRowModel().rows.filter((row) => row.getValue("status") === "dibayar").length} Diterima
                                </span>
                            </div>
                            <span className="text-gray-300 dark:text-gray-600">|</span>
                            <div className="flex items-center">
                                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-1.5"></span>
                                <span className="text-gray-600 dark:text-gray-300">
                                    {table.getFilteredRowModel().rows.filter((row) => row.getValue("status") === "menunggu").length} Menunggu
                                </span>
                            </div>
                            <span className="text-gray-300 dark:text-gray-600">|</span>
                            <div className="flex items-center">
                                <span className="h-2.5 w-2.5 rounded-full bg-red-500 mr-1.5"></span>
                                <span className="text-gray-600 dark:text-gray-300">
                                    {table.getFilteredRowModel().rows.filter((row) => row.getValue("status") === "ditolak").length} Ditolak
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="hidden md:grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800 flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-green-700 dark:text-green-400 font-medium mb-1">Diterima</p>
                            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                                {table.getFilteredRowModel().rows.filter((row) => row.getValue("status") === "dibayar").length}
                            </p>
                            <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                                {((table.getFilteredRowModel().rows.filter((row) => row.getValue("status") === "dibayar").length / table.getFilteredRowModel().rows.length) * 100).toFixed(1)}% dari total
                            </p>
                        </div>
                        <div className="bg-green-200 dark:bg-green-800/60 h-12 w-12 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-yellow-700 dark:text-yellow-400 font-medium mb-1">Menunggu</p>
                            <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                                {table.getFilteredRowModel().rows.filter((row) => row.getValue("status") === "menunggu").length}
                            </p>
                            <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-1">
                                {((table.getFilteredRowModel().rows.filter((row) => row.getValue("status") === "menunggu").length / table.getFilteredRowModel().rows.length) * 100).toFixed(1)}% dari total
                            </p>
                        </div>
                        <div className="bg-yellow-200 dark:bg-yellow-800/60 h-12 w-12 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-700 dark:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 rounded-lg border border-red-200 dark:border-red-800 flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-red-700 dark:text-red-400 font-medium mb-1">Ditolak</p>
                            <p className="text-2xl font-bold text-red-700 dark:text-red-400">
                                {table.getFilteredRowModel().rows.filter((row) => row.getValue("status") === "ditolak").length}
                            </p>
                            <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                                {((table.getFilteredRowModel().rows.filter((row) => row.getValue("status") === "ditolak").length / table.getFilteredRowModel().rows.length) * 100).toFixed(1)}% dari total
                            </p>
                        </div>
                        <div className="bg-red-200 dark:bg-red-800/60 h-12 w-12 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="relative w-full sm:w-auto group">
                            <Input
                                placeholder="Cari berdasarkan nama..."
                                value={(table.getColumn("nama")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table.getColumn("nama")?.setFilterValue(event.target.value)
                                }
                                className="pl-10 min-w-[280px] pr-10 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 ease-in-out"
                            />
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors duration-200" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            {(table.getColumn("nama")?.getFilterValue() as string) && (
                                <button 
                                    onClick={() => table.getColumn("nama")?.setFilterValue("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="15" y1="9" x2="9" y2="15"></line>
                                        <line x1="9" y1="9" x2="15" y2="15"></line>
                                    </svg>
                                </button>
                            )}
                        </div>
                        
                        <Select
                            onValueChange={(value) => {
                                if (value === "all") {
                                    table.getColumn("status")?.setFilterValue("");
                                } else {
                                    table.getColumn("status")?.setFilterValue(value);
                                }
                            }}
                        >
                            <SelectTrigger className="w-[180px] border-gray-300 dark:border-gray-600 focus:ring-1 focus:ring-primary transition-all duration-200 ease-in-out">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                    </svg>
                                    <SelectValue placeholder="Filter Status" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="border-gray-300 dark:border-gray-600 shadow-md">
                                <SelectItem value="all" className="focus:bg-gray-100 dark:focus:bg-gray-800">
                                    <div className="flex items-center">
                                        <span className="w-3 h-3 rounded-full mr-2 bg-gray-300 dark:bg-gray-600"></span>
                                        Semua Status
                                    </div>
                                </SelectItem>
                                <SelectItem value="dibayar" className="focus:bg-green-50 dark:focus:bg-green-900/20">
                                    <div className="flex items-center">
                                        <span className="w-3 h-3 rounded-full mr-2 bg-green-500"></span>
                                        Diterima
                                    </div>
                                </SelectItem>
                                <SelectItem value="menunggu" className="focus:bg-yellow-50 dark:focus:bg-yellow-900/20">
                                    <div className="flex items-center">
                                        <span className="w-3 h-3 rounded-full mr-2 bg-yellow-500"></span>
                                        Menunggu
                                    </div>
                                </SelectItem>
                                <SelectItem value="ditolak" className="focus:bg-red-50 dark:focus:bg-red-900/20">
                                    <div className="flex items-center">
                                        <span className="w-3 h-3 rounded-full mr-2 bg-red-500"></span>
                                        Ditolak
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span className="font-medium">{table.getFilteredRowModel().rows.length}</span>
                        <span className="ml-1">data ditemukan</span>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-gray-800">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="hover:bg-transparent border-gray-200 dark:border-gray-700">
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className="text-gray-700 dark:text-gray-300 font-medium text-xs py-3 px-4">
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
                                table.getRowModel().rows.map((row, index) => (
                                    <TableRow 
                                        key={row.id}
                                        className={`border-gray-200 dark:border-gray-700 
                                        ${index % 2 === 0 ? 'bg-white dark:bg-gray-950' : 'bg-gray-50 dark:bg-gray-900'} 
                                        hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 group`}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="py-3 px-4">
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
                                        className="h-32 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                                                <line x1="2" y1="10" x2="22" y2="10"></line>
                                            </svg>
                                            <p className="mb-1 text-base">Tidak ada data ditemukan</p>
                                            <p className="text-sm opacity-70">Silakan coba dengan pencarian atau filter lain</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <span>Menampilkan <span className="font-medium">{Math.min(
                            table.getState().pagination.pageSize * (table.getState().pagination.pageIndex + 1),
                            table.getFilteredRowModel().rows.length
                        )}</span> dari <span className="font-medium">{table.getFilteredRowModel().rows.length}</span> data</span>
                    </div>
                    
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious 
                                    onClick={() => table.previousPage()} 
                                    className={!table.getCanPreviousPage() 
                                        ? 'pointer-events-none opacity-50' 
                                        : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors'
                                    }
                                    aria-disabled={!table.getCanPreviousPage()}
                                />
                            </PaginationItem>
                            {Array.from({ length: table.getPageCount() }, (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        onClick={() => table.setPageIndex(i)}
                                        isActive={table.getState().pagination.pageIndex === i}
                                        className={table.getState().pagination.pageIndex === i 
                                            ? 'bg-primary text-primary-foreground' 
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors'
                                        }
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext 
                                    onClick={() => table.nextPage()} 
                                    className={!table.getCanNextPage() 
                                        ? 'pointer-events-none opacity-50' 
                                        : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors'
                                    }
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