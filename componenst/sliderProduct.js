import React, { useState } from 'react';
import { Carousel } from 'antd';

import styled from 'styled-components'
const Styles = styled.div`
margin: 0 auto;
`

const SliderProduct = (props) => {
    const { itemImages } = props;

    const slides = itemImages.map((item) => {
        return (

            <img src={props.imagePath + item.src + props.imageType} alt={item.altText} />

        );
    });

    return (
        <Styles>
            <Carousel >
                {slides}
            </Carousel>
        </Styles>
    );
}

export default SliderProduct;
