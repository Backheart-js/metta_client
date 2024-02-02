'use client';

import React, { useState } from 'react';
import Intro from './Intro';

type Props = {};

const Assistant = (props: Props) => {
    return (
        <div className="container-sp py-10 px-3 min-h-screen">
            <section className="center mt-20">
                <Intro />
            </section>
        </div>
    );
};

export default Assistant;
