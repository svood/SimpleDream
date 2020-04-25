import React from 'react'
import CallMe from '../componenst/callMe';
import { useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { Row, Col } from 'antd';
import { withTranslation } from '../i18n'
import MainLayout from '../componenst/layouts/main'
import { ru, ua } from '../public/static/texts/shipment'
import styled from 'styled-components'

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
        bottom: 9%;
        right: 4%;
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

function Shipment({ t, lng }) {
    const mainPageStore = () => {
        return useSelector(state => ({
            store: state.mainPage,
        }), shallowEqual);
    }; // Store
    const { store } = mainPageStore();

    return (
        <MainLayout t={t} meta={{ title: t("title"), description: t("description") }}>
            <InfoContent>
                <Row className="main" justify='cenetr'>
                    <Col sm={12} md={20} className='infoContent' style={{ margin: '3em auto' }}>
                        {lng === 'ru' ? ru() : ua()}
                    </Col>
                    {
                        store.card.length > 0 ?
                            <CartStyle className="shopingCard" onClick={e => window.location.href = '/card'}>
                                <span>{store.card.length}</span>
                                <img src='/images/ShoppingCart.svg' />
                            </CartStyle> : null
                    }
                </Row >
            </InfoContent>
            <CallMe t={t} />
        </MainLayout>
    )
}


Shipment.getInitialProps = ({ req }) => {
    return {
        lng: req.lng,
        namespacesRequired: ['common'],
    }
};

export default withTranslation(['common'])(withRedux(Shipment))