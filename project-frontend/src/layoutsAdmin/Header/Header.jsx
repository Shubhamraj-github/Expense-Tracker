import React from "react";
import classes from "./Header.module.scss";
import Accounts from "./Accounts/Accounts";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import ContainerAdmin from "../../commoncomponents/Container/ContainerAdmin";
import logo from '../../../public/assets/peetpooja.png'

const Header = ({ menuCollapse, setMenuCollapse }) => {
  return (
    <header className={`${classes.header}`}>
      <ContainerAdmin classname={`${classes.headerSeparate}`}>
        <div className={`${classes.logoDivide}`}>
          <img className={`${classes.mainlogos}`} style={{ height: '55px' }} alt="Logo" src={logo} />
          <div className='cursor-pointer' onClick={() => setMenuCollapse(!menuCollapse)}>
            {menuCollapse ? 
                <MenuUnfoldOutlined />
              : 
                <MenuFoldOutlined />
            }
          </div>
        </div>
        <div className={`${classes.rightSection}`}>
          <Accounts />
        </div>
      </ContainerAdmin>
    </header>
  );
};

export default Header;
