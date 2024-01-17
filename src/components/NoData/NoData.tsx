import { Button } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export interface INoDataProps {
    isLogin?: boolean;
}

export default function NoData({ isLogin }: INoDataProps) {
    return (
        <div className="center flex-col">
            <div>
                <Image
                    width={300}
                    height={300}
                    src="/images/NoData.png"
                    alt="No Data"
                />
            </div>
            <div className="text-center text-gray-600 font-semibold text-lg w-[80%]">
                Không tìm thấy dữ liệu, vui lòng thử lại sau!
            </div>
            {isLogin && (
                <Button
                    className="text-white bg-boldGreen"
                    variant="contained"
                    startIcon={<KeyboardReturnIcon />}
                >
                    Quay về trang chủ
                </Button>
            )}
        </div>
    );
}
