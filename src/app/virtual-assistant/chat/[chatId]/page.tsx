'use client';

import { Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import '../../Assistant.scss';
import CustomTextArea from '@/components/TextAreaAutoSize/TextAreaAutoSize';
import completionSync from '@/utils/axios/completion';

export interface IChatProps {}

export default function Chat(props: IChatProps) {
    const [messageValue, setMessageValue] = useState('');
    const [resMessage, setResMessage] = useState('');

    const handleInputChange = (event: any) => {
        setMessageValue(event.target.value);
    };
    const handleSentMessage = async () => {
        try {
            const res = await completionSync.createAICompletion();
            console.log('res: ', res.data);
            const stream = res.data;
            const reader = res.data.pipe();
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                console.log('value: ', value);
                setResMessage((prev) => prev + value);
            }
        } catch (error) {
            console.log(error.message);
        }
        setMessageValue('');
    };

    return (
        <div className="container-sp">
            <div className="assistant__wrapper center-y gap-2 flex-col justify-between w-full md:py-6">
                <section
                    id="top"
                    className="w-full center md:px-6 py-2 bg-lightgreen rounded"
                >
                    <div className="w-full center-y justify-between">
                        <div className="center">
                            <Avatar
                                alt="Assistant"
                                src="../../../../assets/image/assistant-avatar.jpg"
                            />
                            <div className="ml-2">
                                <p className="">Trợ lý sức khỏe</p>
                            </div>
                        </div>
                        <div className="center">
                            <Button
                                className="rounded-2xl text-boldGreen"
                                variant="outlined"
                            >
                                Tạo mới
                            </Button>
                        </div>
                    </div>
                </section>
                <section id="chat-frame" className="flex-grow w-full md:px-6">
                    <div className="flex flex-col w-full h-full gap-4">
                        <div className="frame flex-grow w-full">
                            {!resMessage ? (
                                <div
                                    id="noChat"
                                    className="center-y flex-col w-full h-full"
                                >
                                    <div className="flex-grow center flex-col">
                                        <div className="rounded-full w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gray-200"></div>
                                        <div className="text-center mt-3">
                                            <p className="text-gray-900 text-xl">
                                                Tôi có thể giúp gì?
                                            </p>
                                        </div>
                                    </div>
                                    <div
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
                                    </div>
                                </div>
                            ) : (
                                <div className="">
                                    <p className="">{resMessage}</p>
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
                <section id="interactive" className="w-full mt-2 md:px-6">
                    <div className="center gap-4">
                        <Button
                            className="bg-black text-white flex-1"
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
        </div>
    );
}
