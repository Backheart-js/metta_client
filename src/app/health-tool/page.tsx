'use client';

import React, { useState } from 'react';
import styles from './HealthTool.module.scss';
import clsx from 'clsx';
import Intro from './Intro';
import HealthTool from './HealthTool';
import Result from './Result';

type Props = {};

function Tool({}: Props) {
    const [status, setStatus] = useState('intro');

    const nextPageFunc = (page: string) => {
        setStatus(page);
    };

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
        </div>
    );
}

export default Tool;
