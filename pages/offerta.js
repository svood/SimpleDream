import React from 'react'
import CallMe from '../componenst/callMe';
import { useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { Row, Col } from 'antd';
import Dilivery from '../componenst/sections/dilivery';
import { withTranslation } from '../i18n'
import MainLayout from '../componenst/layouts/main'
import { ru, ua } from '../public/static/texts/offerta';

function Offert({ t, lng }) {
    const mainPageStore = () => {
        return useSelector(state => ({
            store: state.mainPage,
        }), shallowEqual);
    }; // Store
    const { store } = mainPageStore();

    return (
        <MainLayout t={t} meta={{ title: t("title"), description: t("description") }}>
            <Row className="main">
                <Col sm={24} md={24} className="infoContent" >
                    {lng === 'ru' ? ru() : ua()}
                </Col>
            </Row>
            <CallMe t={t} />
            <div>
                {
                    store.card.length > 0 ?
                        <div className="shopingCard" onClick={e => window.location.href = '/card'}>
                            <span>{store.card.length}</span>
                            <img src='/images/ShoppingCart.svg' />
                        </div> : null
                }
            </div>
        </MainLayout >
    )
}


Offert.getInitialProps = (req) => {
    return {
        lng: req.lng,
        namespacesRequired: ['common'],
    }
}

export default withTranslation(['common'])(withRedux(Offert))