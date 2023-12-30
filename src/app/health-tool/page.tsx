'use client';

import React, { useEffect, useState } from 'react';
import styles from './HealthTool.module.scss';
import clsx from 'clsx';
import Intro from './Intro';
import HealthTool from './HealthTool';
import { ILoading } from '@/types/loadingType';
import LoadingModal from '@/components/LoadingModal/LoadingModal';
import { useSelector } from 'react-redux';

type Props = {};

function Tool({}: Props) {
    const { isProgress, text } = useSelector((state) => state.loading);

    useEffect(() => {}, []);

    return (
        <div className="container-sp pt-10">
            <Intro />
            <LoadingModal text={text} showing={isProgress} />
        </div>
    );
}

export default Tool;
