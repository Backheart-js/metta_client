'use client';

import MobileNavbar from '@/components/layout/MobileNavbar/MobileNavbar';
import PCHeader from '@/components/layout/PCHeader/PCHeader';
import Wrapper from '../wrapper/WrapperApp';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkLoginStatus } from '@/middlewares/checkLogin.middleware';
import userSync from '@/utils/axios/user';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isLoginState, setIsLoginState] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { isLogin } = await checkLoginStatus();
                const res = await userSync.getCurrentUser();

                console.log('user: ', res.data.result);
                if (!isLogin) {
                    router.push('/auth/login');
                } else {
                    setIsLoading(false);
                    setIsLoginState(isLogin);
                }

                if (res.status === 200) {
                    sessionStorage.setItem(
                        'userInfo',
                        JSON.stringify(res.data.result),
                    );
                }
            } catch (error) {
                console.log('Lỗi: ', error);
                router.push('/auth/login');
            }
        })();
    }, []);

    return (
        <div className="">
            <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white border-b-2 border-borderLightTheme shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50">
                <PCHeader isLogin={isLoginState} />
            </nav>
            <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-50">
                <MobileNavbar />
            </nav>
            <main className="md:mt-[56px]">
                <Wrapper isLoading={isLoading}>{children}</Wrapper>
            </main>
        </div>
    );
}
