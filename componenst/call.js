/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { faMobile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ModalCall = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            <Button  color="success" onClick={toggle}  className="m-auto"> <FontAwesomeIcon icon={faMobile} /> {buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}></ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <Input placeholder="Имя" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <Input placeholder="Телефон" />
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalCall;