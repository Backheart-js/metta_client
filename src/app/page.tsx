'use client';
import { NextPage } from 'next';
import './GlobalStyle.scss';
import './_variables.scss';
import { checkLoginStatus } from '@/middlewares/checkLogin.middleware';
import { useEffect } from 'react';

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
    useEffect(() => {
        (async () => {
            try {
                const { isLogin } = await checkLoginStatus();
                console.log('Data phản hồi: ', isLogin);
            } catch (error) {
                console.log('Lỗi: ', error);
            }
        })();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="">Home page</div>
        </main>
    );
};

export default Home;
