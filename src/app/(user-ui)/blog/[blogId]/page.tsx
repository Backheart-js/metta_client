'use client';

import { IBlogData } from '@/types/blogType';
import blogSync from '@/utils/axios/blog';
import React, { useEffect, useState } from 'react';
import styles from '.././Blog.module.scss';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export interface IBlogProps {
    params: {
        blogId: string;
    };
}

export default function Blog({ params }: IBlogProps) {
    const { blogId } = params;
    const [progressing, setProgressing] = useState<boolean>(true);
    const [blogData, setBlogData] = useState<IBlogData>({});

    const formatDate = (date: string) => {
        return moment(date).format('DD/MM/YYYY');
    };

    useEffect(() => {
        (async () => {
            try {
                const blogRes = await blogSync.getDetail(blogId);

                if (blogRes.status === 200) {
                    setBlogData(blogRes.data.results);
                    console.log(blogRes.data.results);
                } else if (blogRes.status === 404) {
                    console.log('Méo thấy');
                }
            } catch (error) {
            } finally {
                setProgressing(false);
            }
        })();

        return () => {};
    }, [blogId]);

    return progressing ? (
        <div className="container-sp px-3 py-10">
            <div id="title" className="">
                <div className="my-[30px]">
                    <Skeleton className="w-full h-12" />
                </div>
            </div>
            <div className="my-4">
                <Skeleton className="w-[40%] h-8" />
            </div>
            <div id="summary" className="my-6">
                <Skeleton className="w-[91%] h-8 mt-3" />
                <Skeleton className="w-[85%] h-8 mt-3" />
                <Skeleton className="w-[88%] h-8 mt-3" />
                <Skeleton className="w-[90%] h-8 mt-3" />
                <Skeleton className="w-[80%] h-8 mt-3" />
            </div>
            <div id="thumbnail" className="my-6">
                <Skeleton className="w-full h-[280px]" />
            </div>
            <div id="content" className="">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-[91%] h-8 mt-3" />
                <Skeleton className="w-[34%] h-8 mt-3" />
                <Skeleton className="w-[78%] h-8 mt-3" />
                <Skeleton className="w-[66%] h-8 mt-3" />
                <Skeleton className="w-[69%] h-8 mt-3" />
                <Skeleton className="w-[71%] h-8 mt-3" />
                <Skeleton className="w-[88%] h-8 mt-3" />
                <Skeleton className="w-[78%] h-8 mt-3" />
            </div>
        </div>
    ) : (
        <div className="container-sp py-10 px-3">
            <div className="">
                <div id="title" className="">
                    <h1 className="text-3xl md:text-2xl font-semibold text-boldGreen">
                        {blogData.title}
                    </h1>
                </div>
                <div
                    id="date"
                    className="my-4 text-sm text-gray-400 font-medium center-y gap-2"
                >
                    <p className="">{formatDate(blogData.updatedAt || '')}</p>
                    <div className="">-</div>
                    <p className="">{blogData.author?.fullname}</p>
                </div>
                <div id="summary" className="">
                    <p className="text-gray-600 text-base font-medium">
                        {blogData.summary}
                    </p>
                </div>
                <div id="thumbnail" className="mb-5 mt-4">
                    <div
                        className="w-full pt-[80%] bg-cover bg-center bg-no-repeat rounded-sm shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px]"
                        style={{
                            backgroundImage: `url(${blogData.thumbnail})`,
                        }}
                    ></div>
                </div>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={
                        blogData?.content
                            ? { __html: blogData.content }
                            : undefined
                    }
                />
            </div>
            {/* <div className="">
                <div className="my-6">
                    <p className="text-boldGreen font-semibold text-lg">
                        Có thể bạn cần đọc
                    </p>
                </div>
                <div className=""></div>
            </div> */}
        </div>
    );
}
