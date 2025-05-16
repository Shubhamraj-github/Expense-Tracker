import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import classes from "./SidebarMenu.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, Tooltip, tooltipClasses } from "@mui/material";
import dashboard from "../../../public/assets/dashboard.svg";
import add from "../../../public/assets/add.svg";
import appIcon from "../../../public/assets/appIcon.svg";
import useAuth from "../../hooks/useAuth";

const SidebarMenu = ({ menuCollapse }) => {
  const [toggled, setToggled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const dashboardMenu = [
    {
      menusName: "Dashboard",
      path: "dashboard",
      icons: <img src={dashboard} className={`${classes.iconSize}`} />,
      roles: ["user", "admin"],
    },
    {
      menusName: "Add Expense",
      path: "add-expense",
      icons: <img src={add} className={`${classes.iconSize}`} />,
      roles: ["user"],
    },
    {
      menusName: "User List",
      path: "user-list",
      icons: <img src={appIcon} className={`${classes.iconSize}`} />,
      roles: ["admin"],
    },
    {
      menusName: "Expense List",
      path: "expense-list",
      icons: <img src={appIcon} className={`${classes.iconSize}`} />,
      roles: ["user"],
    },
  ];

  const filteredMenu = dashboardMenu.filter((item) =>
    item.roles.includes(user?.user_type)
  );

  const menuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    label: ({ open }) => ({
      fontWeight: open ? 700 : undefined,
    }),
  };

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#1178EE",
      color: "#ffffff",
      boxShadow: theme.shadows[1],
      fontSize: 14,
      padding: "5px 15px",
    },
  }));

  return (
    <div className={`${classes.sidebarSection}`}>
      <Sidebar
        className={`${classes.sidebarMain} ${
          menuCollapse ? "sidebarCollapse" : "sidebarNotCollapse"
        }`}
        collapsed={menuCollapse}
        toggled={toggled}
        width={menuCollapse ? "76px" : "205px"}
        onBackdropClick={() => setToggled(false)}
        breakPoint="sm"
      >
        <div className={`${classes.sidebarCard}`}>
          <Menu menuItemStyles={menuItemStyles}>
            {menuCollapse ? (
              <>
                {filteredMenu.map((item, index) => (
                  <LightTooltip
                    key={index}
                    title={item.menusName}
                    placement="right"
                  >
                    <MenuItem
                      icon={item.icons}
                      onClick={() => navigate(`/${item.path}`)}
                      className={`sidebarsMenu sidebarHideSubMenu ${
                        currentPath === `/${item.path}` ? "activeMainMenuItem" : ""
                      }`}
                    >
                      {item.menusName}
                    </MenuItem>
                  </LightTooltip>
                ))}
              </>
            ) : (
              <>
                {filteredMenu.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => navigate(`/${item.path}`)}
                    icon={item.icons}
                    className={`sidebarsMenu ${
                      currentPath === `/${item.path}` ? "activeMainMenuItem" : ""
                    }`}
                  >
                    {item.menusName}
                  </MenuItem>
                ))}
              </>
            )}
          </Menu>
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;