'use client';

import { ICombineData, IRating } from '@/types/tool';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import BMI_Chart_image from '@/assets/image/bmi-chart.jpg';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import { Box, Button, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LinkIcon from '@mui/icons-material/Link';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import toolSync from '@/utils/axios/tool';
import { formatInput } from '@/utils/tools/formatMessage';
import Dialog from '@/components/Dialog/Dialog';
import AddLinkIcon from '@mui/icons-material/AddLink';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAppSelector } from '@/lib/hooks';

export interface IResultProps {
    params: {
        resultId: string;
    };
}

interface IMessage {
    [key: string]: string[];
    'Chế độ sinh hoạt': string[];
    'Chế độ dinh dưỡng': string[];
    'Phương pháp tập luyện': string[];
}

export default function Result({ params }: IResultProps) {
    const calcData = useAppSelector((state) => state.tool);
    const { resultId } = params;
    const [resultData, setResultData] = useState<ICombineData>();
    const [openTDEE, setOpenTDEE] = useState(false);
    const [openBRM, setOpenBRM] = useState(false);
    const [message, setMessage] = useState<IMessage>({
        'Chế độ sinh hoạt': [],
        'Chế độ dinh dưỡng': [],
        'Phương pháp tập luyện': [],
    });
    const [rating, setRating] = useState<IRating>({
        isRated: false,
        status: 0,
    });
    const [progress, setProgress] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [openShare, setOpenShare] = useState<boolean>(false);
    const [shareLink, setShareLink] = useState('');
    const [isGeneratedLink, setIsGeneratedLink] = useState<boolean>(false);

    const handleCloseShare = (): void => {
        setOpenShare(false);
    };

    const handleRating = async (status: number): Promise<void> => {
        if ((rating.status !== status && rating.isRated) || !rating.isRated) {
            try {
                setProgress(true);
                setRating({
                    isRated: true,
                    status,
                });

                const res = await toolSync.updateRating({
                    id: resultId,
                    data: {
                        isRated: true,
                        status,
                    },
                });

                if (res.status === 200) {
                    // Show snackbar cảm ơn
                }
            } catch (error) {
                console.log('error', (error as Error).message);
            } finally {
                setProgress(false);
            }
        } else return;
    };

    const handleSaveDataToSchedule = async (): Promise<void> => {
        try {
            const res = await toolSync.saveToSchedule(resultId);

            // Show thông báo lưu thành công
            if (res.status === 200) {
                console.log('Thành công');
                setIsSaved(true);
            }
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    const getUrl = (id: string): string => {
        return `${window.location.origin}/preview/${id}`;
    };

    const generateLink = async (): Promise<void> => {
        try {
            const shareString = v4();
            const link = getUrl(shareString);
            const openShareData = await toolSync.sharingData({
                id: resultId,
                shareString,
            });

            if (openShareData.status === 200) {
                setIsGeneratedLink(true);
                setShareLink(link);
                // Mở snackbar
            } else {
                // Thông báo lỗi
            }
        } catch (error) {
            // Mở snackbar thông tháo lỗi
        }
    };

    const copyLink = async (): Promise<void> => {
        if (shareLink && isGeneratedLink) {
            try {
                await navigator.clipboard.writeText(shareLink);
                alert('Đã lưu vào bộ nhớ tạm');
            } catch (error) {
                alert('Xảy ra lỗi, vui lòng thử lại');
            }
        } else {
            return;
        }
    };

    useEffect(() => {
        if (!calcData.bmi) {
            (async function () {
                try {
                    const { status, data } = await toolSync.getResult(resultId);

                    if (status === 200) {
                        setResultData(data.toolData);
                        setRating(data.toolData.userLike);
                        setMessage(formatInput(data.toolData.message));
                        setIsGeneratedLink(data.toolData.share.public);
                        setShareLink(getUrl(data.toolData.share.shareString));
                    }
                } catch (error) {
                    console.log((error as Error).message);
                }
            })();
        } else {
            setResultData(calcData);
            setMessage(formatInput(calcData.message));
        }

        return () => {};
    }, [calcData, resultId]);

    return (
        <div className="container-sp pt-6 md:pt-10">
            <div className="">
                <h1 className="text-center font-semibold text-gray-700">
                    Kết quả đo
                </h1>
            </div>
            <section className="mt-4 mb-6 md:mt-10 md:mb-14 px-5 md:px-0">
                <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between">
                    <div className="flex flex-col md:flex-row items-center md:items-end">
                        <p className="text-boldGreen font-semibold text-xl">
                            Chỉ số BMI hiện tại:
                        </p>
                        <p className="text-yellowPrimary text-4xl ml-2 font-bold">
                            {resultData?.bmi}
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-10 text-sm font-semibold text-gray-700">
                        {resultData?.status}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between mb-8 md:mb-10 mt-6 md:mt-12">
                    <div className="text-center">
                        <p className="text-boldGreen font-semibold text-lg">
                            Cân nặng tối thiểu
                        </p>
                        <div className="text-center mt-2">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {resultData?.minWeight}
                            </span>
                        </div>
                        <div className="mt-1 md:mt-2">
                            <span className="text-gray-400 text-sm">
                                kilogram
                            </span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-boldGreen font-semibold text-lg mt-4 md:mt-0">
                            Cân nặng lý tưởng
                        </p>
                        <div className="text-center mt-2">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {resultData?.idealWeight}
                            </span>
                        </div>
                        <div className="mt-1 md:mt-2">
                            <span className="text-gray-400 text-sm">
                                kilogram
                            </span>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="text-boldGreen font-semibold text-lg mt-4 md:mt-0">
                            Cân nặng tối đa
                        </p>
                        <div className="text-center mt-2">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {resultData?.maxWeight}
                            </span>
                        </div>
                        <div className="mt-1 md:mt-2">
                            <span className="text-gray-400 text-sm">
                                kilogram
                            </span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <p className="text-xl text-boldGreen font-semibold">
                        Đánh giá:
                    </p>
                    <div className="mt-2">
                        <span className="text-gray-500 text-base">
                            {resultData?.advice}
                        </span>
                    </div>
                </div>
                <div className="overflow-hidden rounded-lg mt-8">
                    <Image
                        src={BMI_Chart_image}
                        alt="BMI chart"
                        className="w-full h-full"
                    />
                    <p className="text-center italic text-gray-500 font-semibold text-base">
                        Bảng đối chiếu chỉ số BMI
                    </p>
                </div>
            </section>
            <div className="border-t-[1px] border-gray-300"></div>
            <section className="mt-8 mb-14 px-5 md:px-0">
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton
                        className="px-0"
                        onClick={() => setOpenTDEE((prev) => !prev)}
                    >
                        <ListItemText
                            primary={
                                <div className="flex flex-col md:flex-row items-start md:items-end">
                                    <p className="text-boldGreen font-semibold text-xl">
                                        Chỉ số TDEE hiện tại:
                                    </p>
                                    <p className="text-yellowPrimary text-3xl md:text-4xl md:ml-2 font-bold">
                                        {resultData?.tdee}
                                    </p>
                                </div>
                            }
                        />
                        {openTDEE ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Box sx={{ transition: 'height 0.3s ease-in-out' }}>
                        <Collapse
                            in={openTDEE}
                            timeout="auto"
                            unmountOnExit
                            className="pl-0 pr-4 md:px-5 pt-2"
                        >
                            <div className="">
                                <div className="mb-5">
                                    <h4 className="text-boldGreen font-medium text-lg">
                                        TDEE là gì? Tính TDEE giảm cân lành mạnh
                                    </h4>
                                </div>
                                <div className="text-gray-400 font-normal text-base">
                                    <p>
                                        TDEE (Total Daily Energy Expenditure) là
                                        tất cả năng lượng cần thiết cho hoạt
                                        động mỗi ngày của bạn. Tính TDEE giúp
                                        bạn đạt được mục tiêu dinh dưỡng (giảm
                                        cân, tăng cân) của bạn.
                                    </p>
                                    <div className="h-4"></div>
                                    <p>
                                        Xác định chỉ số TDEE sẽ giúp bạn biết rõ
                                        lượng calo nên tăng hoặc giảm để đạt
                                        hiệu quả cutting (giảm cân) hay bulking
                                        (tăng cân). Nói cách khác, TDEE giúp cân
                                        bằng năng lượng để đạt được hiệu quả
                                        giảm cân nhưng không gây ra những tác
                                        động tiêu cực đến sức khỏe.
                                    </p>
                                </div>
                            </div>
                        </Collapse>
                    </Box>
                    <div className="h-5 w-full"></div>
                    <ListItemButton
                        className="px-0"
                        onClick={() => setOpenBRM((prev) => !prev)}
                    >
                        <ListItemText
                            primary={
                                <div className="flex flex-col md:flex-row items-start md:items-end">
                                    <p className="text-boldGreen font-semibold text-xl">
                                        Chỉ số BRM hiện tại:
                                    </p>
                                    <p className="text-yellowPrimary text-3xl md:text-4xl md:ml-2 font-bold">
                                        {resultData?.brm}
                                    </p>
                                </div>
                            }
                        />

                        {openBRM ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                        in={openBRM}
                        timeout="auto"
                        unmountOnExit
                        className="pl-0 pr-4 md:px-5 pt-2"
                    >
                        <div className="">
                            <div className="mb-5">
                                <h4 className="text-boldGreen font-medium text-lg">
                                    BRM là gì?
                                </h4>
                            </div>
                            <p className="text-gray-400 font-normal text-base">
                                Chỉ số BMR (Basal Metabolic Rate) là tỷ lệ trao
                                đổi chất cơ bản trong cơ thể con người,cho biết
                                mức năng lượng tối thiểu mà cơ thể cần, để thực
                                hiện các chức năng cơ bản nhằm đảm bảo duy trì
                                sự sống của cơ thể, khi bạn ở trạng thái nghỉ
                                ngơi.
                            </p>
                        </div>
                    </Collapse>
                </List>
                <div className="flex md:justify-between flex-col md:flex-col mb-10 mt-10 md:mt-8 md:gap-10 px-6 md:px-0">
                    <div className="flex flex-col md:flex-row items-center md:items-end ">
                        <p className="text-boldGreen font-semibold text-lg text-center">
                            Lượng calo cần thiết cho ngày tập luyện là:
                        </p>
                        <div className="text-center mt-2 md: mx-4">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {resultData?.workoutDayCalo}
                            </span>
                        </div>
                        <div className="mt-1 md:mt-0 md:mb-1">
                            <span className="text-gray-400 text-sm md:leading-6">
                                calories
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-end mt-4 md:mt-0">
                        <p className="text-boldGreen font-semibold text-lg text-center">
                            Lượng calo cần thiết cho ngày nghỉ là:
                        </p>
                        <div className="text-center mt-2 md: mx-4">
                            <span className="text-yellowPrimary text-4xl font-bold">
                                {resultData?.restDayCalo}
                            </span>
                        </div>
                        <div className="mt-1 md:mt-0 md:mb-1">
                            <span className="text-gray-400 text-sm md:leading-6">
                                calories
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-14 bg-lightgreen px-5 md:px-0 py-8 rounded-2xl">
                <h1 className="text-center font-semibold text-gray-700">
                    Lời khuyên
                </h1>
                <div className="md:px-4">
                    {Object.keys(message).map((category: string, index) => (
                        <div key={index} className={index > 0 ? 'mt-8' : ''}>
                            <h5 className="text-boldGreen font-semibold text-lg">
                                {index + 1}. {category}
                            </h5>
                            <ul className="mt-4 md:pl-4">
                                {message[category].map(
                                    (content: any, index: number) => (
                                        <li
                                            key={index}
                                            className={clsx(
                                                index > 0 ? 'mt-2' : '',
                                                'text-gray-500 text-base leading-6',
                                            )}
                                        >
                                            {content}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
            <section className="mt-4">
                <div className="flex flex-col md:flex-row justify-center items-center">
                    <p className="text-gray-500">
                        {rating.isRated
                            ? 'Cảm ơn bạn đã đánh giá'
                            : 'Bạn có hài lòng với lời khuyên?'}
                    </p>
                    <div className="flex mt-3 md:mt-0 md:ml-6 gap-4 md:gap-3">
                        <IconButton
                            disabled={progress}
                            onClick={() => handleRating(0)}
                        >
                            {rating.isRated && rating.status === 0 ? (
                                <ThumbUpIcon className="text-boldGreen scale-[1.2]" />
                            ) : (
                                <ThumbUpOutlinedIcon className="text-gray-500 hover:text-boldGreen" />
                            )}
                        </IconButton>
                        <IconButton
                            disabled={progress}
                            onClick={() => handleRating(1)}
                        >
                            {rating.isRated && rating.status === 1 ? (
                                <ThumbDownIcon className="text-boldGreen scale-[1.2]" />
                            ) : (
                                <ThumbDownAltOutlinedIcon className="text-gray-500 hover:text-boldGreen" />
                            )}
                        </IconButton>
                    </div>
                </div>
            </section>
            <section className="mt-10 mb-20 pb-10 md:my-14 px-5 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                    <Button
                        variant="contained"
                        className="bg-boldGreen hover:bg-boldGreen text-white h-10 rounded-2xl"
                        disabled={isSaved}
                        onClick={handleSaveDataToSchedule}
                    >
                        <SaveIcon />
                        <span className="ml-2">
                            {isSaved ? 'Đã lưu' : 'Lưu dữ liệu'}
                        </span>
                    </Button>
                    <Button
                        variant="contained"
                        className="bg-yellowPrimary hover:bg-yellowPrimary h-10 rounded-2xl"
                        onClick={() => setOpenShare(true)}
                    >
                        <LinkIcon />
                        <p className="ml-2">Chia sẻ</p>
                    </Button>
                </div>
            </section>
            <Dialog isOpen={openShare} handleClose={handleCloseShare}>
                <div className="min-w-[550px]">
                    <div className="">
                        <h3 className="text-2xl text-gray-700 font-medium">
                            Chia sẻ kết quả của bạn
                        </h3>
                        <p className="text-sm text-gray-500 w-[350px] mt-2">
                            Chia sẻ các chỉ số cơ thể thông qua đường dẫn liên
                            kết hoặc mạng xã hội bạn đang sử dụng.
                        </p>
                    </div>
                    <div className="mt-6">
                        <div className="">
                            <h4 className="text-gray-600 font-medium">
                                Liên kết
                            </h4>
                            <div className="mt-3 center w-full h-12 border-[1px] border-gray-400 rounded-lg py-1 pr-1">
                                <div className="h-full flex-grow">
                                    <input
                                        value={shareLink}
                                        readOnly={true}
                                        type="text"
                                        className="h-full w-full px-2 py-1 border-none focus-visible:outline-none"
                                        onClick={copyLink}
                                    />
                                </div>
                                <div className="h-full center gap-2">
                                    <button
                                        disabled={isGeneratedLink}
                                        style={{
                                            backgroundColor:
                                                'rgba(0, 78, 236, 0.2)',
                                        }}
                                        className={clsx(
                                            isGeneratedLink
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:!bg-[rgba(0,78,236,0.35)]',
                                            'px-2 h-full center gap-1 text-sm font-medium transition-all text-[#004eec] border-none rounded-lg',
                                        )}
                                        onClick={generateLink}
                                    >
                                        <AddLinkIcon className="text-[18px]" />
                                        <p className="">Tạo liên kết</p>
                                    </button>
                                    <button
                                        disabled={!shareLink}
                                        style={{
                                            border: '1px solid rgba(107, 114, 128, 0.5)',
                                        }}
                                        className={clsx(
                                            !shareLink
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:bg-gray-100',
                                            'px-2 h-full center gap-1 bg-transparent transition-all text-sm font-medium text-gray-500 rounded-lg mr-1',
                                        )}
                                        onClick={copyLink}
                                    >
                                        <ContentCopyIcon className="text-[18px]" />
                                        <p className="">Sao chép</p>
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs font-medium text-gray-400 mt-2">
                                Bất cứ ai cũng có thể truy cập thông qua liên
                                kết của bạn
                            </p>
                        </div>
                        <div className="center gap-4 my-8">
                            <div className="border-b-[1px] border-gray-300 w-40"></div>
                            <div className="">
                                <p className="text-sm font-medium text-gray-500">
                                    Hoặc
                                </p>
                            </div>
                            <div className="border-b-[1px] border-gray-300 w-40"></div>
                        </div>
                        <div className=""></div>
                    </div>
                    <div className="mt-6 center-y justify-end w-full">
                        <Button
                            className="rounded-2xl bg-[#004eec]"
                            variant="contained"
                            onClick={() => setOpenShare(false)}
                        >
                            XONG
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
