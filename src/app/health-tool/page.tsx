'use client';

import React, { useEffect, useState } from 'react';
import styles from './HealthTool.module.scss';
import clsx from 'clsx';
import Intro from './Intro';
import HealthTool from './HealthTool';
import Result from './Result';
import { ILoading } from '@/types/loadingType';
import LoadingModal from '@/components/LoadingModal/LoadingModal';
import { useSelector } from 'react-redux';

type Props = {};

function Tool({}: Props) {
    const { isProgress, text } = useSelector((state) => state.loading);
    const [status, setStatus] = useState('intro');

    const nextPageFunc = (page: string) => {
        setStatus(page);
    };

    useEffect(() => {}, []);

    return (
        <div className="container-sp pt-10">
            {status === 'intro' && (
                <section>
                    <Intro handleNextPage={nextPageFunc} />
                </section>
            )}
            {status === 'tool' && (
                <section>
                    <HealthTool handleNextPage={nextPageFunc} />
                </section>
            )}
            {status === 'result' && (
                <section>
                    <Result />
                </section>
            )}
            <LoadingModal text={text} showing={isProgress} />
        </div>
    );
}

export default Tool;
