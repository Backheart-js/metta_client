'use client';

import React, { useState } from 'react';
import Intro from './Intro';

type Props = {};

const Assistant = (props: Props) => {
    const [status, setStatus] = useState('intro');

    const nextPageFunc = (page: string) => {
        setStatus(page);
    };

    return (
        <div className="container-sp py-10">
            {status === 'intro' && (
                <section className="">
                    <Intro handleNextPage={nextPageFunc} />
                </section>
            )}
            {/* {
            status === 'assistant' && (

            )
        } */}
        </div>
    );
};

export default Assistant;
