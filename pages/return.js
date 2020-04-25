import React from 'react'
import CallMe from '../componenst/callMe';
import { useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { Row, Col } from 'antd';
import { withTranslation } from '../i18n'
import MainLayout from '../componenst/layouts/main'
import { ru, ua } from '../public/static/texts/return'
function Return({ t,lng }) {
    const mainPageStore = () => {
        return useSelector(state => ({
            store: state.mainPage,
        }), shallowEqual);
    }; // Store
    const { store } = mainPageStore();

    return (
        <MainLayout t={t} meta={{ title: t("title"), description: t("description") }} className="main">
            <Row >
                <Col sm={24} md={24} className="infoContent" style={{ margin: '3em auto', width: '78%' }}>
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


Return.getInitialProps = ({ req }) => {
    return {
        lng: req.lng,
        namespacesRequired: ['common'],
    }
}

export default withTranslation(['common'])(withRedux(Return))