import React from 'react'
import CallMe from '../componenst/callMe';
import { useSelector, shallowEqual } from 'react-redux'
import { withRedux } from '../lib/redux'
import { Row, Col } from 'antd';
import Dilivery from '../componenst/sections/dilivery';
import { withTranslation } from '../i18n'
import MainLayout from '../componenst/layouts/main'

function About({ t }) {
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
                    <h1>{t("aboutPage.h1")}</h1>
                    {t("aboutPage.p", { returnObjects: true }).map(item => { return (<p> {item} </p>) })}
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