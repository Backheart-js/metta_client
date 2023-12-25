'use client';
import { NextPage } from 'next';
import { checkLoginStatus } from '@/middlewares/checkLogin.middleware';
import { useEffect } from 'react';
import { articleData } from '../mock/mock-article';
import ListArticlePage from '@/components/ListPage/ListArticlePage';
import MainTitle from '@/components/ListPage/common/MainTitle';
import ListIssuePage from '@/components/ListPage/ListIssuePage';
import Image from 'next/image';
import DoctorBanner from '../assets/image/banner-ai.png';
import Dot from '../assets/image/dots-banner.png';
import { Button } from '@mui/material';

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
            <section>
                <div className="bg-white w-full h-[280px] md:h-[600px] relative shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                    <div className="absolute flex flex-col top-[50%] translate-y-[-50%] left-[24%] w-[400px]">
                        <h2 className="text-greenPrimary font-semibold text-5xl">
                            Xin chào
                        </h2>
                        <p className="text-[#6d6d6d] text-base my-5">
                            Đặt mục tiêu, theo dõi hoạt động hàng ngày của bạn
                            và đạt những cột mốc mới
                        </p>
                        <div className="">
                            <Button
                                variant="contained"
                                className="bg-[#252525]"
                            >
                                Lên kế hoạch
                            </Button>
                        </div>
                    </div>
                    <Image
                        className="absolute top-[50%] translate-y-[-50%] right-[24%] w-[450px]"
                        src={DoctorBanner}
                        alt="doctor"
                    />
                    <Image
                        className="absolute right-0"
                        src={Dot}
                        alt="doctor"
                    />
                </div>
            </section>
            <div className="container mt-20">
                <section id="regular-issue">
                    <MainTitle mainTitle="Vấn đề sức khỏe phổ biến" />
                    <ListIssuePage title="" showAllPath="" />
                </section>
                <section id="article" className="w-full">
                    <ListArticlePage
                        layout="grid"
                        title="Health News"
                        showAllPath="/health-article"
                        data={articleData}
                    />
                </section>
            </div>
        </div>
    );
};

export default Home;
