import NavBar from '../header';
import FooterNav from '../footerNav';
import { Layout, Row, Col } from 'antd';

import Head from 'next/head'

const MainLayout = ({ children, t, meta }) => {
  const { Content, Header, Footer } = Layout;

  return (

    <Layout style={{width: '95%', margin: '0 auto',background: 'white' }}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description}></meta>
      </Head>
      <Header style={{ background: 'white'}}>
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
          `}</style>
    </Layout>

  )

};

export default MainLayout;