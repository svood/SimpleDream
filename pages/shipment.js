import React from 'react'
import CallMe from '../componenst/callMe';
import { useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { Row, Col } from 'antd';
import { withTranslation } from '../i18n'
import MainLayout from '../componenst/layouts/main'
import { ru, ua } from '../public/static/texts/shipment'

function Shipment({ t, lng }) {
    const mainPageStore = () => {
        return useSelector(state => ({
            store: state.mainPage,
        }), shallowEqual);
    }; // Store
    const { store } = mainPageStore();

    return (
        <MainLayout t={t} meta={{ title: t("title"), description: t("description") }}>
            <Row className="main" justify='cenetr'>
                <Col sm={12} md={20} className='infoContent' style={{ margin: '3em auto' }}>
                    {lng === 'ru' ? ru() : ua()}
                </Col>
                {
                    store.card.length > 0 ?
                        <div className="shopingCard" onClick={e => window.location.href = '/card'}>
                            <span>{store.card.length}</span>
                            <img src='/images/ShoppingCart.svg' />
                        </div> : null
                }
            </Row >
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