import React from 'react';
import { Carousel } from 'antd';
import LazyLoad from 'react-lazyload';

const mainSlider = () => {

    const itemImages = [
        {
            src: '/images/baners/2.jpg',
            altText: 'Slide 1',
            caption: 'Slide 1'
        },
        {
            src: '/images/baners/3.jpg',
            altText: 'Slide 2',
            caption: 'Slide 2'
        }
    ];

    const slides = itemImages.map((item) => {
        return (
            <LazyLoad><img src={item.src} alt={item.altText} /></LazyLoad>
        );
    });

    return (
        <Carousel autoplay>
            {slides}
        </Carousel>
    );
}

export default mainSlider;
