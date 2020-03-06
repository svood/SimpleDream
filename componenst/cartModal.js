import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import data from '../data/products'

const CartModal = (props) => {
    const {
        title
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    // const itemData = data.find(item => item.title == "Простынь на резинке Желтая1");

    const totlalPrice = () => {
        let total = 0;
        props.data.map(i=>{
            total = total + Number(i.price);
        })
        return total;
    }
    return (
        <div>
            {console.log(props.data)}
            <div className="shopingCard" onClick={e => setModal(true)}>
                <span>{props.data.length}</span>
                <img src='/images/ShoppingCart.svg' />
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>

                    {props.data.map(i => {
                        return (
                            <Container>
                                <Row>
                                    <Col sm={12} md={3}><img src={ (data.find(item => item.id === i.id)).img[0].src }/></Col>
                                    <Col sm={12} md={6}>{i.title}</Col>
                                    <Col sm={12} md={3}>{i.price}</Col>
                                </Row>
                                <Row>Всего: {totlalPrice()} </Row>
                                
                            </Container>
                        )


                    })}

                </ModalBody>
            </Modal>
        </div>
    );
}

export default CartModal;