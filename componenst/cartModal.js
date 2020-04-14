import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import data from '../data/products'

const CartModal = (props) => {
    const {
        title
    } = props;

    const [modal, setModal] = useState(false);
    const [cardData, setcardData] = useState([]);
    useEffect(() => {
        setcardData([...props.data])
    });
    const toggle = () => setModal(!modal);


    const removeProduct = (element) => {
        const newData = [];
        cardData.forEach(e => {
            if (e.id !== element.id) {
                newData.push(e)
            }
        });
        setcardData([...newData])
    }

    const totlalPrice = () => {
        let total = 0;
        cardData.map(i => {
            total = total + Number(i.price);
        })
        return total;
    }
    return (
        <div>
            <div className="shopingCard" onClick={e => setModal(true)}>
                <span>{cardData.length}</span>
                <img src='/images/ShoppingCart.svg' />
            </div>
            <Modal isOpen={modal} toggle={toggle} size={'lg'}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    {cardData.map(i => {
                        return (
                            <Container>
                                <Row>
                                    <Col sm={12} md={3}>
                                        <Button onClick={e => removeProduct(i)}>Удалить</Button>
                                    </Col>
                                    <Col sm={12} md={6}>Название:{i.title}</Col>
                                    <Col sm={12} md={3}>Цена: {i.price}</Col>
                                </Row>
                            </Container>
                        )
                    })}
                    <Row>Всего: {totlalPrice()} </Row>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default CartModal;