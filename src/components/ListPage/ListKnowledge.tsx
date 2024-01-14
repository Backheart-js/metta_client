import React, { useEffect, useState } from 'react';
import CardItem from '../CardItem/CardItem';
import blogSync from '@/utils/axios/blog';
import { IBlogData } from '@/types/blogType';

interface IListIssuePage {}

function ListKnowledge({}: IListIssuePage) {
    const [data, setdata] = useState<IBlogData[]>([]);

    useEffect(() => {
        (async () => {
            try {
                // Gọi API để lấy dữ liệu từ máy chủ
                const response = await blogSync.getAll(8, 1);
                console.log(response);
                setdata(response.data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();

        return () => {};
    }, []);

    // useEffect(() => {
    //     filterDataIssue(issueData);
    // }, [type]);

    return (
        <div className="w-full overflow-x-scroll py-4 pl-3">
            <div className="flex gap-4">
                {data.map((data, index) => (
                    <div key={index} className="">
                        <CardItem
                            path={`/blog/${data._id}`}
                            thumbnailUrl={data.thumbnail}
                            title={data.title}
                            summary={data.summary}
                            author={data.author?.fullname}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        // Gọi API để lấy dữ liệu từ máy chủ
        const response = await blogSync.getAll(8, 1);
        console.log(response);
        // Trả về dữ liệu từ máy chủ
        return {
            props: {
                listData: response.data.results,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        // Trả về một đối tượng props trống để tránh lỗi nếu có vấn đề khi gọi API
        return {
            props: {},
        };
    }
}

export default ListKnowledge;
