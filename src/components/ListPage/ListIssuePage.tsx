import React, { useEffect, useState } from 'react';
import MainTitle from './common/MainTitle';
import TitleList from './common/TitleList';
import SlideCarousel from '../SlideCarousel/SlideCarousel';
import { issueData } from '@/mock/mock-issue';
import { Button, Typography } from '@mui/material';
import { IIssueCategory, IIssue } from '@/types/issueType';
import CardItem from '../CardItem/CardItem';

interface IListIssuePage {
    title: string;
    showAllPath: string;
}

function ListIssuePage({ title, showAllPath }: IListIssuePage) {
    const [type, setType] = useState('general');
    const [listData, setListData] = useState([]);
    const [dataToShow, setDataToShow] = useState<IIssueCategory[]>([]);

    const filterDataIssue = (data: IIssueCategory[]) => {
        const newData = data.filter((item: IIssueCategory) => {
            return item.type === type;
        });
        setDataToShow(newData);
        console.log('newData', newData);
    };

    useEffect(() => {
        try {
            (async function () {
                //Call api fetch data

                setListData([]);
            })();
        } catch (error) {}

        return () => {};
    }, []);

    useEffect(() => {
        filterDataIssue(issueData);
    }, [type]);

    return (
        <div>
            <TitleList title={title} showAllPath={showAllPath} />
            <div className="center gap-6">
                <Button variant="text" onClick={() => setType('general')}>
                    Chung
                </Button>
                <Button variant="text" onClick={() => setType('male')}>
                    Nam giới
                </Button>
                <Button variant="text" onClick={() => setType('female')}>
                    Nữ giới
                </Button>
            </div>
            <div className="">
                {dataToShow.map((data) => {
                    return (
                        <div key={data.categoryId}>
                            <Typography variant="h6" gutterBottom>
                                {data.title}
                            </Typography>
                            <SlideCarousel>
                                {data.listData.map((issue: IIssue) => {
                                    return (
                                        <CardItem
                                            path=""
                                            compact
                                            key={issue.id}
                                        />
                                    );
                                })}
                            </SlideCarousel>
                        </div>
                    );
                })}
            </div>
            <SlideCarousel>
                <div></div>
            </SlideCarousel>
        </div>
    );
}

export default ListIssuePage;
