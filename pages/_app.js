import "react-component-countdown-timer/lib/styles.scss";
// import 'bootstrap/dist/css/bootstrap.min.css';

import 'antd/dist/antd.css';
import 'rc-steps/assets/index.css';
import '../style.scss';
import Header from '../componenst/header'
import Footer from '../componenst/footer'
import Head from 'next/head'
import { Select, Button, Layout } from 'antd';

export default function MyApp({ Component, pageProps }) {
  
    return (
        <>


            <Head>
                <script src="//static.liqpay.ua/libjs/checkout.js" async></script>
            </Head>

            <Layout>
                <Header />
            </Layout>

            <Layout style={{width:'95%',margin:'0 auto'}}>
                <Component {...pageProps} />
            </Layout>

            <Layout>
                <Footer />
            </Layout>

        </>
    )
}