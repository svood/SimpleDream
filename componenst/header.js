import React, { useState } from 'react';
import { Menu, Layout, Drawer, Button } from 'antd';
import {
  isMobile
} from "react-device-detect";
import { MenuUnfoldOutlined } from '@ant-design/icons';

const NavBar = ({ length }) => {
  const [visible, setVisible] = useState(false);

  const redirectTo = (path) => {
    window.location.href = path
  }

  const menu = (mode) => {
    return (
      <Menu theme="light" mode={mode}>
        <Menu.Item key="1" onClick={e => redirectTo("/")}>
          Главная
          </Menu.Item>
        <Menu.Item key="2" onClick={e => redirectTo("/shipment")}>
          Доставка и Оплата
          </Menu.Item>
        <Menu.Item key="3" onClick={e => redirectTo("/card")}>
          Корзина
          </Menu.Item>
      </Menu >
    )

  };




  return (
    <>
      <div className="logo" >SimpleDreams</div>

      {!isMobile ?
        menu('horizontal') :
        <>
        <Button style={{float:'right', top: '1em'}} type="primary" shape="circle" onClick={e => setVisible(true)} icon={<MenuUnfoldOutlined />} />

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
