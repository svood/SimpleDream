import React, { useState } from 'react';
import styled from 'styled-components'
import { Modal, Card } from 'antd';

const StylesDiv = styled.div`
    @media (max-width: 850px) {
        a {
            width: 100%;
            text-align: center;
        }
    }
`

const InfoStyles = styled.div`
font-size: 12pt;
font-size: 12pt;
text-transform: uppercase;
text-align: left;

display: list-item;
line-height: 25px;
margin-bottom: 3em;
font-weight: 100;
    a {
        font-weight: 500;
        color: #7128d3;
        margin-top: 1em;
        display: block;
     }
       @media (max-width: 900px) {
        a {
            text-align: center;
        }
       }
`;
const HrefStyle = styled.a`
    background: #ffffff;
    padding: 4px;
    position: fixed;
    bottom: 0;
    left:0;
    writing-mode: lr;
    border: 2px solid #d8adff;
    color: #955dc0;
    font-size: larger;
    font-weight: 600;
    border-bottom: 0;
 
`
const TellMe = ({ t }) => {


    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <StylesDiv>
            <HrefStyle color="danger" onClick={toggle}>Наши контакты</HrefStyle>

            <Modal title={"Контакты"} visible={modal} onCancel={e => setModal(false)} footer={null} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} centered>
                <Card>
                    <InfoStyles>
                        <p><strong>{t('ContactsPage.mainNumber')}:</strong> <br /><a href="tel:+380953140133">+(380) 95 31 40 133</a></p>
                        <p><strong>{t('ContactsPage.dopNumber')}:</strong> <br /><a href="tel:+380976581954">+(380) 97 65 81 954</a></p>
                        <p><strong>{t('ContactsPage.mail')}:</strong> <br /><a href="mailto:info.simpledreams@gmail.com">info.simpledreams@gmail.com</a></p>
                    </InfoStyles>
                </Card>
            </Modal>

        </StylesDiv>
    );
}

export default TellMe;