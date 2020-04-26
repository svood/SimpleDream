import React from 'react'
import CallMe from '../componenst/callMe';
import { useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { Row, Col } from 'antd';
import Dilivery from '../componenst/sections/dilivery';
import { withTranslation } from '../i18n'
import MainLayout from '../componenst/layouts/main'
import styled from 'styled-components'
import i18n from '../i18n'

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
function About({ t }) {
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
                        <h1>{t("aboutPage.h1")}</h1>
                        {t("aboutPage.p", { returnObjects: true }).map(item => { return (<p> {item} </p>) })}
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
            <Dilivery t={t} />
        </MainLayout>
    )
}


About.getInitialProps = async () => {
    return {
        namespacesRequired: ['common'],
    }
}

export default withTranslation(['common'])(withRedux(About))