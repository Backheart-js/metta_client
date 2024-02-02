'use client';

import { Avatar, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import '../../Assistant.scss';
import CustomTextArea from '@/components/TextAreaAutoSize/TextAreaAutoSize';
import completionSync from '@/utils/axios/completion';
import Dialog from '@/components/Dialog/Dialog';
import { ImessageType } from '@/types/chatType';
import Image from 'next/image';

export interface IChatProps {}

export default function Chat(props: IChatProps) {
    const scrollableDivRef = useRef<HTMLDivElement | null>(null);
    const [isResponse, setIsResponse] = useState<boolean>(false);
    const [messageValue, setMessageValue] = useState<string>('');
    const [resMessage, setResMessage] = useState<ImessageType[]>([]);
    const [limitRequest, setLimitRequest] = useState<number>(15);
    const [welcomeDialogOpen, setwelcomeDialogOpen] = useState<boolean>(false);
    const [isGetChat, setisGetChat] = useState(false);

    const handleInputChange = (event: any) => {
        setMessageValue(event.target.value);
    };
    const handleSentMessage = async () => {
        if (isResponse || limitRequest === 0 || !messageValue.trim()) {
            return;
        }

        setIsResponse(true);
        setMessageValue('');
        setResMessage((prev) => [
            ...prev,
            {
                isUser: true,
                content: messageValue,
            },
        ]);
        try {
            const res = await completionSync.createAICompletion(messageValue);
            console.log('res: ', res.data);
            if (res.status === 200) {
                setResMessage((prev) => [...prev, res.data.result]);
                setLimitRequest((prev) => prev - 1);
                sessionStorage.setItem(
                    'limitChatRequest',
                    JSON.stringify(limitRequest - 1),
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsResponse(false);
            scrollableDivRef.current &&
                (scrollableDivRef.current.scrollTop =
                    scrollableDivRef.current.scrollHeight);
        }
    };

    const handleCloseDialog = () => {
        sessionStorage.setItem('openChatDialog', JSON.stringify(false));
        setwelcomeDialogOpen(false);
    };

    useEffect(() => {
        const checkOpenDialog = JSON.parse(
            sessionStorage.getItem('openChatDialog') || 'null',
        );

        if (checkOpenDialog === null) {
            setwelcomeDialogOpen(true);
        }

        (async () => {
            setisGetChat(true);
            try {
                const res = await completionSync.getChat();

                if (res.status === 200) {
                    setResMessage(res.data.result.data);
                    setLimitRequest(res.data.result.restRequest);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setisGetChat(false);
                scrollableDivRef.current &&
                    (scrollableDivRef.current.scrollTop =
                        scrollableDivRef.current.scrollHeight);
            }
        })();
    }, []);

    return (
        <div className="container-sp">
            <div className="assistant__wrapper center-y gap-2 flex-col justify-between w-full md:py-6">
                <section
                    id="top"
                    className="w-full center px-4 md:px-6 py-2 bg-lightgreen rounded"
                >
                    <div className="w-full center-y justify-between">
                        <div className="center">
                            <Avatar
                                alt="Assistant"
                                src="/images/assistant-avatar.jpg"
                            />
                            <div className="ml-2">
                                <p className="">Trợ lý ảo</p>
                            </div>
                        </div>
                        <div className="center-y justify-end">
                            {!isGetChat && (
                                <div className="text-gray-700 text-sm font-medium mr-4">
                                    Số lượt hỏi: {limitRequest}/15
                                </div>
                            )}
                            <Button
                                className="rounded-2xl text-boldGreen"
                                variant="outlined"
                            >
                                Tạo mới
                            </Button>
                        </div>
                    </div>
                </section>
                <section
                    id="chat-frame"
                    className={`h-[517px] flex-grow w-full px-4 md:px-6 ${
                        isGetChat ? 'hidden' : ''
                    }`}
                >
                    <div className="flex flex-col w-full h-full gap-4">
                        <div className="frame w-full flex-1">
                            {resMessage.length === 0 ? (
                                <div
                                    id="noChat"
                                    className="relative center-y flex-col w-full h-full"
                                >
                                    <div className="flex-grow center flex-col">
                                        <div className="rounded-full center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
                                            <Avatar
                                                alt="Assistant"
                                                src="/icon-256x256.png"
                                                sx={{ width: 56, height: 56 }}
                                            />
                                        </div>
                                        <div className="text-center mt-3">
                                            <p className="text-gray-900 text-xl">
                                                Tôi có thể giúp gì?
                                            </p>
                                        </div>
                                    </div>
                                    {/* <div
                                        id="suggesstion"
                                        className="px-3 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-2 w-full"
                                    >
                                        <div className="overflow-hidden border-[1px] border-gray-400 rounded-2xl">
                                            <button className="w-full h-full text-left hover:bg-gray-100 transition-all p-2">
                                                <p className="text-gray-500 text-sm font-medium">
                                                    Suggest title
                                                </p>
                                                <span className="text-xs text-gray-400">
                                                    Lorem ipsum dolor, sit amet
                                                </span>
                                            </button>
                                        </div>
                                        <div className="overflow-hidden border-[1px] border-gray-400 rounded-2xl">
                                            <button className="w-full h-full text-left hover:bg-gray-100 transition-all p-2">
                                                <p className="text-gray-500 text-sm font-medium">
                                                    Suggest title
                                                </p>
                                                <span className="text-xs text-gray-400">
                                                    Lorem ipsum dolor, sit amet
                                                </span>
                                            </button>
                                        </div>
                                        <div className="overflow-hidden border-[1px] border-gray-400 rounded-2xl">
                                            <button className="w-full h-full text-left hover:bg-gray-100 transition-all p-2">
                                                <p className="text-gray-500 text-sm font-medium">
                                                    Suggest title
                                                </p>
                                                <span className="text-xs text-gray-400">
                                                    Lorem ipsum dolor, sit amet
                                                </span>
                                            </button>
                                        </div>
                                        <div className="overflow-hidden border-[1px] border-gray-400 rounded-2xl">
                                            <button className="w-full h-full text-left hover:bg-gray-100 transition-all p-2">
                                                <p className="text-gray-500 text-sm font-medium">
                                                    Suggest title
                                                </p>
                                                <span className="text-xs text-gray-400">
                                                    Lorem ipsum dolor, sit amet
                                                </span>
                                            </button>
                                        </div>
                                    </div> */}
                                </div>
                            ) : (
                                <div className="center-x items-end h-full w-full">
                                    <div
                                        ref={scrollableDivRef}
                                        className="chat-container w-full max-h-full overflow-y-auto flex flex-col scroll-smooth smooth"
                                    >
                                        {resMessage.map(
                                            (message: ImessageType, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`message-wrapper flex items-end gap-4 smooth ${
                                                            message.isUser
                                                                ? 'justify-end'
                                                                : ''
                                                        }`}
                                                    >
                                                        {!message.isUser && (
                                                            <Avatar
                                                                alt="Assistant"
                                                                src="/images/assistant-avatar.jpg"
                                                            />
                                                        )}
                                                        <div
                                                            className={`message-content max-w-[60%] ${
                                                                message.isUser
                                                                    ? 'right'
                                                                    : 'left'
                                                            }`}
                                                        >
                                                            <p>
                                                                {
                                                                    message.content
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="border-[1px] border-gray-400 h-fit rounded-2xl w-full overflow-hidden">
                            <CustomTextArea
                                value={messageValue}
                                maxRows={5}
                                handleSubmit={handleSentMessage}
                                handleChange={handleInputChange}
                            />
                        </div>
                    </div>
                </section>
                <section id="interactive" className="w-full mt-2 px-4 md:px-6">
                    <div className="center gap-4">
                        <Button
                            disabled={isResponse}
                            className="bg-black text-white flex-1 disabled:opacity-50"
                            variant="contained"
                            onClick={handleSentMessage}
                        >
                            Gửi đi
                        </Button>
                        <Button
                            className="flex-1 text-boldGreen"
                            variant="outlined"
                        >
                            Dừng
                        </Button>
                    </div>
                </section>
            </div>
            <Dialog isOpen={welcomeDialogOpen} handleClose={handleCloseDialog}>
                <div className=""></div>
            </Dialog>
        </div>
    );
}
