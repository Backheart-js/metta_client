import React from 'react';
import styles from './HealthTool.module.scss';
import clsx from 'clsx';
import ToolForm from './components/ToolForm';

type Props = {
    handleNextPage: (page: string) => void;
};

function HealthTool({ handleNextPage }: Props) {
    return (
        <div>
            <section className="">
                <div className="h-14 px-4 py-2 bg-greenPrimary rounded-t-3xl">
                    <h1 className="text-center text-white text-2xl font-semibold leading-relaxed my-0">
                        Công cụ tính chỉ số cơ thể
                    </h1>
                </div>
                <div className="border border-gray-300 px-6 pt-8 pb-6 shadow-md rounded-b-lg">
                    <ToolForm />
                </div>
            </section>
        </div>
    );
}

export default HealthTool;
