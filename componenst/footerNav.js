import React from 'react'
import { Row, Col } from 'antd';
import styled from 'styled-components'
const StylesFooter = styled.div`
  img {
    width: 118px;
    float: right;
  }
  a {
    padding: 1em;
    color: #767676;
  }
  @media (max-width: 850px) {
    .footerNav  {
      margin: 0 auto;
      width: 100%;
      display: block;
      z-index: 1;
    }
    img {
      width: 118px;
      margin: 0 auto;
      display: none;

    }
    a {
      width: 100%;
      color:black;
    margin: 0 auto;
    text-align: center;
    display: block;
    }
   }
`;

const Footer = ({ t }) => {
  return (
    <StylesFooter>
      <Row>
        <Col sm={24} md={20} className='footerNav'>
          <nav>
            <a href='/' >{t("navLinks.index")}</a>
            <a href='/shipment' >{t("navLinks.shipment")}</a>
            <a href='/return'>{t("navLinks.return")}</a>
            <a href='/offerta'>{t("navLinks.offerta")}</a>
            <a href='/about'>{t("navLinks.about")}</a>
            <a href='/card'>{t("navLinks.card")}</a>
            <a href='/contacts'>{t("navLinks.contacts")}</a>
          </nav>
        </Col>
        <Col sm={24} md={4} className='footerNav'>
          <img src="/images/vizamaster.svg" className="viza" className="footerLogo" />
        </Col>
      </Row>
    </StylesFooter>
  )
}

export default Footer