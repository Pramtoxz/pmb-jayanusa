import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Users, CreditCard, GraduationCap } from 'lucide-react';

interface Props {
    stats: {
        total_pendaftar: number;
        pembayaran_pending: number;
        pembayaran_diterima: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-4">
                        <div className="flex items-center gap-4">
                            <Users className="h-8 w-8 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Total Pendaftar</p>
                                <h3 className="text-2xl font-bold">{stats.total_pendaftar}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-4">
                        <div className="flex items-center gap-4">
                            <CreditCard className="h-8 w-8 text-yellow-500" />
                            <div>
                                <p className="text-sm text-muted-foreground">Pembayaran Pending</p>
                                <h3 className="text-2xl font-bold">{stats.pembayaran_pending}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-4">
                        <div className="flex items-center gap-4">
                            <GraduationCap className="h-8 w-8 text-green-500" />
                            <div>
                                <p className="text-sm text-muted-foreground">Pembayaran Diterima</p>
                                <h3 className="text-2xl font-bold">{stats.pembayaran_diterima}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
