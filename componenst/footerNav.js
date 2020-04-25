import React from 'react'
import { Row, Col } from 'antd';
const Footer = ({ t }) => {
  return (

    <Row>
      <Col sm={24} md={20} className='footerNav'>
        <nav>
          <a href='/' >{t("navLinks.index")}</a>
          <a href='/shipment' >{t("navLinks.shipment")}</a>
          <a href='/return'>{t("navLinks.return")}</a>
          <a href='/offerta'>{t("navLinks.offerta")}</a>
          <a href='/about'>{t("navLinks.about")}</a>
          <a href='/card'>{t("navLinks.card")}</a>
        </nav>
      </Col>
      <Col sm={24} md={4} className='footerNav'>
        <img src="/images/vizamaster.svg" className="viza" className="footerLogo" />
      </Col>
    </Row>
  )
}

export default Footer