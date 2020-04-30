import NavBar from '../header';
import FooterNav from '../footerNav';
import { Layout, Row, Col } from 'antd';

import Head from 'next/head'

const MainLayout = ({ children, t, meta }) => {
  const { Content, Header, Footer } = Layout;

  return (

    <Layout style={{ width: '95%', margin: '0 auto', background: 'white' }}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description}></meta>
      </Head>
      <Header style={{ background: 'white' }}>
        <NavBar t={t} />
      </Header>
      <Content>{children}</Content>
      <Footer>
        <FooterNav t={t} />
      </Footer>
      <style global jsx>{`
            body {
              background-image: url('/images/bg.jpg');
            }
            @font-face {
              font-family: Lobster;
              src: url('/static/fonts/Lobster-Regular.ttf');
            }
            .ant-carousel .slick-dots li button {
              width: 20px;
              height: 20px;
              background: blue;
              border-radius: 50px;
            }  
            .ant-carousel .slick-dots li.slick-active button {
              background: red;
            }
            .ant-modal-mask {
              background: url(https://upload.wikimedia.org/wikipedia/ru/9/9d/Maggie_Simpson.png) 26% 100% no-repeat;
              background-color: #0000004d;
          }
          `}</style>
    </Layout>

  )

};

export default MainLayout;