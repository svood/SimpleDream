import React, { useState } from 'react';
import { Menu, Drawer, Button } from 'antd';
import { isMobile } from "react-device-detect";
import { MenuUnfoldOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { i18n } from '../i18n'
import axios from 'axios'
const NavStyles = styled.a`
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
  line-height: 2;
  font-weight: 100;
  font-size: large;
  font-family: Lobster;
  color: #9325cb;
`;

const LengStyled = styled.div`
    position: absolute;
    right: 3em;
    top: 0.5em;
    button {
      width: 30px;
      height: 29px;
      line-height: 0;
      background: #fef6ff;
      border: 1px solid #959595;
      margin: 0.3em;
      border-radius: 50px;
      color: #9217c4;
    }

`

const NavBar = ({ t }) => {
  const [visible, setVisible] = useState(false);

  const redirectTo = (path) => {
    window.location.href = path
  }

  const menu = (mode) => {
    return (
      <>
        <Menu theme="light" mode={mode}>
          <Menu.Item key="1" onClick={e => redirectTo("/")}>
            {t("navLinks.index")}
          </Menu.Item>
          <Menu.Item key="2" onClick={e => redirectTo("/shipment")}>
            {t("navLinks.shipment")}
          </Menu.Item>
          <Menu.Item key="3" onClick={e => redirectTo("/card")}>
            {t("navLinks.card")}
          </Menu.Item>
          <Menu.Item key="4" onClick={e => redirectTo("/contacts")}>
            {t("navLinks.contacts")}
          </Menu.Item>

          
        </Menu >
        {Leng()}
      </>
    )

  };

  const Leng = () => {
    return (
      <LengStyled>
        <button onClick={() => { i18n.changeLanguage("ru") }} style={i18n.language === "ru" ? { background: '#7043bb', color: 'white' } : { background: "#fef6ff" }}>ru</button>
        <button onClick={() => { i18n.changeLanguage("ua") }} style={i18n.language === "ua" ? { background: '#7043bb', color: 'white' } : { background: "#fef6ff" }}>ua</button>
      </LengStyled>
    )

  }

  return (
    <>
      <NavStyles className="logo" href='/'>SimpleDreams</NavStyles>
      {!isMobile ?
        menu('horizontal') :
        <>
          <Button style={{ float: 'right', top: '1em' }} shape="circle" onClick={e => setVisible(true)} icon={<MenuUnfoldOutlined />} />
          <Drawer
            title="Меню"
            placement={'left'}
            closable={false}
            onClose={e => setVisible(false)}
            visible={visible}
          >
            {menu('vertical')}
          </Drawer>
        </>
      }
    </>
  );
}


export default NavBar
