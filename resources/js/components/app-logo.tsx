import LogoJayanusa from '@/assets/images/home/jayanusa.webp';
export default function AppLogo() {
    return (
        <>
            <div className="flex items-center justify-center size-8">
                <img 
                     src={LogoJayanusa}
                    alt="Logo Jayanusa" 
                    className="h-8 w-auto"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Jayanusa</span>
            </div>
        </>
    );
}
