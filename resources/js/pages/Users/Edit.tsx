import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ArrowLeft } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Props {
    user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola User',
        href: '/users',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function Edit({ user }: Props) {
    const [data, setData] = useState<User>(user);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.put(`/users/${user.id}`, {
            name: data.name,
            email: data.email,
            role: data.role,
        }, {
            onSuccess: () => {
                toast.success('Data pengguna berhasil diperbarui');
                router.get('/users');
            },
            onError: (errors) => {
                setErrors(errors);
                toast.error('Gagal memperbarui data');
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit User - ${user.name}`} />
            <Toaster />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="rounded-xl bg-white shadow-sm">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">Edit User</h2>
                            <Button 
                                variant="outline"
                                onClick={() => router.get('/users')}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit} className="max-w-lg">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select
                                        value={data.role}
                                        onValueChange={(value) => setData(prev => ({ ...prev, role: value }))}
                                    >
                                        <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="user">User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Memperbarui...' : 'Perbarui'}
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={() => router.get('/users')}
                                    >
                                        Batal
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 