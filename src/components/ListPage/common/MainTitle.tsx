import React from 'react';

interface IMainTitle {
    mainTitle: string;
}

function MainTitle({ mainTitle }: IMainTitle) {
    return (
        <div className="w-full text-center">
            <h2 className="text-3xl font-semibold">{mainTitle}</h2>
        </div>
    );
}

export default MainTitle;
