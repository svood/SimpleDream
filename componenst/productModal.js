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

    const itemData = data.find(item => item.title == "Простынь на резинке Желтая1");

    return (
        <div>

            <a color="danger" onClick={toggle}>{props.children}</a>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    <Slider itemImages={itemData.img} />
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ProductModal;