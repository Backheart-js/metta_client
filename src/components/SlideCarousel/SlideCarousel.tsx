import React, { ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ISlideCarouselProps {
    numberOfSlides?: number;
    children: ReactNode;
}

const SlideCarousel = ({
    numberOfSlides = 1,
    children,
}: ISlideCarouselProps) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: numberOfSlides,
        slidesToScroll: 1,
    };

    return <Slider {...settings}>{children}</Slider>;
};

export default SlideCarousel;
