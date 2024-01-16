import MobileNavbar from '@/components/layout/MobileNavbar/MobileNavbar';
import PCHeader from '@/components/layout/PCHeader/PCHeader';
import Wrapper from '../wrapper/WrapperApp';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="">
            <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white border-b-2 border-borderLightTheme shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50">
                <PCHeader />
            </nav>
            <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-50">
                <MobileNavbar />
            </nav>
            <main className="md:mt-[56px]">
                <Wrapper>{children}</Wrapper>
            </main>
        </div>
    );
}
