import React from 'react';
import 'antd/dist/antd.css';
import '../style.scss';
import { appWithTranslation } from '../i18n'



const App = ({ Component, pageProps }) => (
    <React.Fragment>
        <Component {...pageProps} />
    </React.Fragment>
)



App.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    } return { pageProps }
} 

export default appWithTranslation(App)