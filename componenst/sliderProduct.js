import React, { useState } from 'react';
import { Carousel } from 'antd';




const SliderProduct = (props) => {
    const { itemImages } = props;

    const slides = itemImages.map((item) => {
        return (
            <div>
                <img src={props.imagePath + item.src + props.imageType} alt={item.altText} />
            </div>
        );
    });

    return (
        <Carousel >
            {slides}
        </Carousel>
    );
}

export default SliderProduct;
