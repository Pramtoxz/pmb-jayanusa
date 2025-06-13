import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    
    // Memisahkan menu laporan dan menu utama
    const menuLaporan = items.filter(item => 
        item.title === 'Laporan Pembayaran' || 
        item.title === 'Laporan Siswa' || 
        item.title === 'Laporan Daftar Ulang'
    );
    
    const menuUtama = items.filter(item => 
        item.title !== 'Laporan Pembayaran' && 
        item.title !== 'Laporan Siswa' && 
        item.title !== 'Laporan Daftar Ulang'
    );
    
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {menuUtama.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton  
                            asChild isActive={item.href === page.url}
                            tooltip={{ children: item.title }}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            
            {menuLaporan.length > 0 && (
                <>
                    <SidebarGroupLabel>Laporan</SidebarGroupLabel>
                    <SidebarMenu>
                        {menuLaporan.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton  
                                    asChild isActive={item.href === page.url}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </>
            )}
        </SidebarGroup>
    );
}
