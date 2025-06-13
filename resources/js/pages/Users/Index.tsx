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
import { MoreHorizontal, Eye, Pencil, ArrowUpDown, Search as SearchIcon } from 'lucide-react';
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

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    nik?: string | null;
    created_at: string;
}

interface Props {
    users: User[];
    filters: {
        search: string | null;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola User',
        href: '/users',
    },
];

const getRoleBadgeStyle = (role: string) => {
    switch (role) {
        case 'admin':
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
        case 'user':
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
};

const columns: ColumnDef<User>[] = [
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
        cell: ({ row }) => {
            const nik = row.getValue("nik") as string | null;
            return nik ? <span>{nik}</span> : <span className="text-muted-foreground text-sm italic">-</span>;
        }
    },
    {
        accessorKey: "name",
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
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.getValue("role") as string
            return (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeStyle(role)}`}>
                    {role}
                </span>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: "Tanggal Dibuat",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

            // Handle edit
            const handleEdit = () => {
                router.get(`/users/${user.id}/edit`);
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
                        <DropdownMenuItem onClick={() => router.get(`/users/${user.id}`)}>
                            <Eye className="mr-2 h-4 w-4 text-blue-600" />
                            Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit()}>
                            <Pencil className="mr-2 h-4 w-4 text-yellow-600" />
                            Edit
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function Users({ users, filters }: Props) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [searchTerm, setSearchTerm] = React.useState(filters.search || "");
    const searchTimeout = React.useRef<NodeJS.Timeout | null>(null);
    
    const table = useReactTable({
        data: users,
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
    });

    // Handle search with debounce
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        searchTimeout.current = setTimeout(() => {
            router.get('/users', { search: value }, {
                preserveState: true,
                replace: true,
            });
        }, 500); // Debounce 500ms
    };

    // Handle search form submission
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get('/users', { search: searchTerm }, {
            preserveState: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola User" />
            <Toaster />
            <div className="flex h-full flex-1 flex-col space-y-8 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Kelola User</h2>
                        <p className="text-muted-foreground">
                            Kelola data pengguna sistem
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-4 w-full md:w-1/2">
                        <div className="relative w-full">
                            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Cari berdasarkan nama, email, atau NIK..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full pl-10"
                            />
                        </div>
                        <Button type="submit" variant="outline">Cari</Button>
                    </form>

                    <div className="flex items-center space-x-2">
                        <div className="text-sm text-muted-foreground">
                            {users.length} data ditemukan
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
                        {users.length} data ditemukan
                    </div>
                    {table.getPageCount() > 1 && (
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
                    )}
                </div>
            </div>
        </AppLayout>
    );
} 