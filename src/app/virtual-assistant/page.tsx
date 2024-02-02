'use client';

import React, { useState } from 'react';
import Intro from './Intro';

type Props = {};

const Assistant = (props: Props) => {
    return (
        <div className="container-sp py-10">
            <section className="">
                <Intro />
            </section>
        </div>
    );
};

export default Assistant;
