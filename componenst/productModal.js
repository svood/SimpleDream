import React, { useState } from 'react';
import styled from 'styled-components'
import Slider from './sliderProduct'
import data from '../data/products'
import { Modal } from 'antd';

const StylesDiv = styled.div`

button {
    display:none !important;
  
}`
const ProductModal = (props) => {
    const {
        title
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const itemData = data.find(item => item.title == title);

    return (
        <StylesDiv >
            <a color="danger" onClick={toggle}>{props.children}</a>

            <Modal  title={title} visible={modal} onCancel={e => setModal(false)} footer={null} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} centered>
                <Slider itemImages={itemData.img} imagePath={props.imagePath} imageType={props.imageType} />
            </Modal>

        </StylesDiv>
    );
}

export default ProductModal;