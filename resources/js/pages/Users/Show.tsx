import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface Siswa {
    nik: string;
    nama: string;
    program_studi: string;
}

interface UserDetail {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    siswa: Siswa | null;
}

interface Props {
    user: UserDetail;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola User',
        href: '/users',
    },
    {
        title: 'Detail',
        href: '#',
    },
];

export default function Show({ user }: Props) {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        router.post(`/users/${user.id}/reset-password`, {
            password,
            password_confirmation: passwordConfirmation
        }, {
            onSuccess: () => {
                toast.success('Password berhasil direset');
                setPassword('');
                setPasswordConfirmation('');
            },
            onError: (errors) => {
                setErrors(errors);
                toast.error('Gagal mereset password');
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail User - ${user.name}`} />
            <Toaster />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="rounded-xl bg-white shadow-sm">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">Detail User</h2>
                            <Button 
                                variant="outline"
                                onClick={() => router.get('/users')}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Informasi User */}
                            <div className="space-y-6">
                                <div className="pb-4 border-b">
                                    <h3 className="text-lg font-semibold text-primary">Informasi User</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-sm text-gray-500">ID</span>
                                            <p className="font-medium">{user.id}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Nama</span>
                                            <p className="font-medium">{user.name}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Email</span>
                                            <p className="font-medium">{user.email}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Role</span>
                                            <p className={`font-medium capitalize ${
                                                user.role === 'admin' 
                                                ? 'text-blue-600' 
                                                : 'text-green-600'
                                            }`}>
                                                {user.role}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Tanggal Dibuat</span>
                                            <p className="font-medium">{user.created_at}</p>
                                        </div>
                                    </div>
                                </div>

                                {user.siswa && (
                                    <>
                                        <div className="pb-4 border-b mt-8">
                                            <h3 className="text-lg font-semibold text-primary">Data Siswa Terkait</h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-sm text-gray-500">NIK</span>
                                                <p className="font-medium">{user.siswa.nik}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Nama</span>
                                                <p className="font-medium">{user.siswa.nama}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Program Studi</span>
                                                <p className="font-medium">{user.siswa.program_studi}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Reset Password Form */}
                            <div className="space-y-6">
                                <div className="pb-4 border-b">
                                    <h3 className="text-lg font-semibold text-primary">Reset Password</h3>
                                </div>

                                <form onSubmit={handleResetPassword} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password Baru</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={errors.password ? 'border-red-500' : ''}
                                        />
                                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={passwordConfirmation}
                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                            className={errors.password_confirmation ? 'border-red-500' : ''}
                                        />
                                        {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                                    </div>

                                    <Button type="submit" disabled={isSubmitting} className="mt-4">
                                        {isSubmitting ? 'Memproses...' : 'Reset Password'}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 