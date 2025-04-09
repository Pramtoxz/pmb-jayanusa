import LogoJayanusa from '@/assets/images/home/jayanusa.webp';

export default function AppLogoIcon({ className }: { className?: string }) {
    return (
        <img 
        src={LogoJayanusa}
            alt="Logo Jayanusa" 
            className={className}
        />
    );
}
