import React, { useState } from 'react';

import Slider from './sliderProduct'
import data from '../data/products'
import { Modal } from 'antd';

const ProductModal = (props) => {
    const {
        title
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const itemData = data.find(item => item.title == title);

    return (
        <div>
            <a color="danger" onClick={toggle}>{props.children}</a>

            <Modal title={title} visible={modal} onCancel={e=>setModal(false)} dots={'sda' }>
                <Slider itemImages={itemData.img} imagePath={props.imagePath} imageType={props.imageType} />
            </Modal>
        </div>
    );
}

export default ProductModal;