'use client';
import { NextPage } from 'next';
import './GlobalStyle.scss';
import './_variables.scss';
import { checkLoginStatus } from '@/middlewares/checkLogin.middleware';
import { useEffect } from 'react';
import { articleData } from './mock/mock-article';
import ListPage from '@/components/ListPage/ListPage';

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
        <div className="flex min-h-screen flex-col items-center justify-between">
            <div className="w-full">
                <ListPage
                    layout="grid"
                    id="#article"
                    title="Health News"
                    showAllPath="/health-article"
                    data={articleData}
                />
            </div>
        </div>
    );
};

export default Home;
