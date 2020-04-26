import React from 'react';
import { Carousel } from 'antd';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components'

const mainSlider = () => {


    const SliderStyle = styled.div`
        img {
            width:100%;
        }
    `;

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
        <SliderStyle>
            <Carousel autoplay>
                {slides}
            </Carousel>
        </SliderStyle>
    );
}

export default mainSlider;
