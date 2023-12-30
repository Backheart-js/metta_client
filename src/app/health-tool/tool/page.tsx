import React from 'react';
import ToolForm from '../components/ToolForm';

type Props = {};

export default function Tool({}: Props) {
    return (
        <div className="container-sp pt-10">
            <section className="px-4 md:px-0 pb-20">
                <div className="px-4 py-2 bg-greenPrimary rounded-t-3xl">
                    <h1 className="text-center text-white text-2xl font-semibold leading-relaxed my-0">
                        Công cụ tính chỉ số cơ thể
                    </h1>
                </div>
                <div className="border border-gray-300 px-3 md:px-6 pt-5 md:pt-8 pb-5 md:pb-6 shadow-md rounded-b-lg">
                    <ToolForm />
                </div>
            </section>
        </div>
    );
}
