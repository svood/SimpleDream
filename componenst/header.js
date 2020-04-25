import React, { useState } from 'react';
import { Menu, Drawer, Button } from 'antd';
import { isMobile } from "react-device-detect";
import { MenuUnfoldOutlined } from '@ant-design/icons';
import styled from 'styled-components'

const NavStyles  = styled.a`
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
  line-height: 2;
  font-family: cursive;
  color: #453280;
  font-weight: 600;
  font-size: large;
`;

const NavBar = ({ t }) => {
  const [visible, setVisible] = useState(false);

  const redirectTo = (path) => {
    window.location.href = path
  }

  const menu = (mode) => {
    return (
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
      </Menu >
    )

  };

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
