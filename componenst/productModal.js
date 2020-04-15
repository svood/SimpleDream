import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Slider from './sliderProduct'
import data from '../data/products'

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
            <Modal isOpen={modal} toggle={toggle} size={'lg'}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    <Slider itemImages={itemData.img} imagePath={props.imagePath} imageType={props.imageType} />
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ProductModal;