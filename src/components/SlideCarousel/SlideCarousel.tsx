import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardArticle from '../CardArticle/CardArticle';
import { IArticleType } from '@/types/articleType';

interface ISlideCarouselProps {
    articles: IArticleType[];
}

const SlideCarousel = ({ articles }: ISlideCarouselProps) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            {articles.map((article, index) => (
                <CardArticle
                    path={`/news/${article.slug}`}
                    articleData={article}
                    key={index}
                />
            ))}
        </Slider>
    );
};

export default SlideCarousel;
