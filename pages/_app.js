import "react-component-countdown-timer/lib/styles.scss";
// import 'bootstrap/dist/css/bootstrap.min.css';

import 'antd/dist/antd.css';
import 'rc-steps/assets/index.css';
import '../style.scss';
import NavBar from '../componenst/header'
import FooterNav from '../componenst/footer'
import Head from 'next/head'
import { Layout } from 'antd';

export default function MyApp({ Component, pageProps }) {
    const { Content, Header,Footer } = Layout;

    return (
        <>
       <Head>
       <script src="//static.liqpay.ua/libjs/checkout.js" async></script>

        </Head>

        <Layout style={{ width: '95%', margin: '0 auto', background: 'white' }}>
            <Header style={{background: 'white' }}><NavBar/></Header>
            <Content> <Component {...pageProps} /></Content>
            <Footer>FooterNav</Footer>
        </Layout>

        </>
    )
}