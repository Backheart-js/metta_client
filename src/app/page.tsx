'use client';
import { NextPage } from 'next';
import './GlobalStyle.scss';
import './_variables.scss';
import { checkLoginStatus } from '@/middlewares/checkLogin.middleware';
import { useEffect } from 'react';
import { articleData } from '../mock/mock-article';
import ListArticlePage from '@/components/ListPage/ListArticlePage';
import MainTitle from '@/components/ListPage/common/MainTitle';
import ListIssuePage from '@/components/ListPage/ListIssuePage';

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
    useEffect(() => {
        (async () => {
            try {
                const { isLogin } = await checkLoginStatus();
            } catch (error) {
                console.log('Lỗi: ', error);
            }
        })();
    }, []);

    return (
        <div className="">
            <section id="article" className="w-full">
                <ListArticlePage
                    layout="grid"
                    title="Health News"
                    showAllPath="/health-article"
                    data={articleData}
                />
            </section>
            <section id="regular-issue">
                <MainTitle mainTitle="Vấn đề sức khỏe phổ biến" />
                <ListIssuePage title="" showAllPath="" />
            </section>
        </div>
    );
};

export default Home;
