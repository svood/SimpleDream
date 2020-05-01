import React from 'react';
import { Carousel } from 'antd';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components'
import i18n from '../i18n'
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
    const itemImagesUA = [
        {
            src: '/images/baners/2_UA.jpg',
            altText: 'Slide 1',
            caption: 'Slide 1'
        },
        {
            src: '/images/baners/3_UA.jpg',
            altText: 'Slide 2',
            caption: 'Slide 2'
        }
    ];
    
    let data = (i18n.language === "ru") ? itemImages : itemImagesUA;

    const slides = data.map((item) => {
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
