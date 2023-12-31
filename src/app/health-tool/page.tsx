'use client';

import React, { useEffect, useState } from 'react';
import Intro from './Intro';

type Props = {};

function Tool({}: Props) {
    useEffect(() => {}, []);

    return (
        <div className="container-sp pt-10">
            <Intro />
        </div>
    );
}

export default Tool;
