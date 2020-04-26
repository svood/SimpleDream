import React from 'react'
import CallMe from '../componenst/callMe';
import { useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { Row, Col } from 'antd';
import Dilivery from '../componenst/sections/dilivery';
import { withTranslation } from '../i18n'
import MainLayout from '../componenst/layouts/main'
import { ru, ua } from '../public/static/texts/offerta';
import styled from 'styled-components'
import { i18n } from '../i18n'
const InfoContent = styled.div`
        width:95%;
        margin:1em auto;
        text-align: justify;
        border: 1px solid rebeccapurple;
        border-radius: 16px;
        padding: 2em;
        h1 {
            border-left: 3px solid red;
            padding-left: 1em;
            margin-top: 1em;
            margin-bottom: 1em;
            color: #004a99;
        }
        h3 {
            font-size: 16pt;
            color: #004a99;
        }
        ul {
            margin-top: 1em;
        }
        
`;

const CartStyle = styled.div`
    position: fixed;
    img {
        width: 100px;
        position: fixed;
        bottom: 5%;
        right: 3%;
        z-index: 9;
        background: white;
        border: 1px solid #1ba52c;
        border-radius: 84px;
    }
    span {
        position: fixed;
        bottom: 17%;
        right: 4%;
        z-index: 10;
        font-size: 17pt;
        color: #ff0047;
        background: white;
        border-radius: 50px;
        border: 1px solid #ffa73a;
        width: 35px;
        height: 35px;
        text-align: center;
    }
`
function Offert({ t }) {
    const mainPageStore = () => {
        return useSelector(state => ({
            store: state.mainPage,
        }), shallowEqual);
    }; // Store
    const { store } = mainPageStore();

    return (
        <MainLayout t={t} meta={{ title: t("title"), description: t("description") }}>
            <InfoContent>
                <Row className="main">
                    <Col sm={24} md={24} className="infoContent" >
                        {i18n.language === 'ru' ? ru() : ua()}
                    </Col>
                </Row>
            </InfoContent>
            <CallMe t={t} />
            <div>
                {
                    store.card.length > 0 ?
                        <CartStyle className="shopingCard" onClick={e => window.location.href = '/card'}>
                            <span>{store.card.length}</span>
                            <img src='/images/ShoppingCart.svg' />
                        </CartStyle> : null
                }
            </div>
        </MainLayout >
    )
}


Offert.getInitialProps = ({req}) => {
    return {
        namespacesRequired: ['common'],
    }
}

export default withRedux(withTranslation(['common'])(Offert))