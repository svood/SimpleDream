import React from 'react';
import { Carousel } from 'antd';

const mainSlider = () => {

    const itemImages = [
        {
            src: '/images/baners/3.jpg',
            altText: 'Slide 1',
            caption: 'Slide 1'
        },
        {
            src: '/images/baners/3.jpg',
            altText: 'Slide 2',
            caption: 'Slide 2'
        },
        {
            src: '/images/baners/3.jpg',
            altText: 'Slide 3',
            caption: 'Slide 3'
        }
    ];

    const slides = itemImages.map((item) => {
        return (
            <img src={item.src} alt={item.altText} />
        );
    });

    return (
        <Carousel autoplay>
            {slides}
        </Carousel>
    );
}

export default mainSlider;
