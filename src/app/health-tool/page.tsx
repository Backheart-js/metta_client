'use client';

import React, { useEffect, useState } from 'react';
import Intro from './Intro';

type Props = {};

function Tool({}: Props) {
    useEffect(() => {}, []);

    return (
        <div className="container-sp pt-16 sm:pt-10 md:pt-0">
            <Intro />
        </div>
    );
}

export default Tool;
