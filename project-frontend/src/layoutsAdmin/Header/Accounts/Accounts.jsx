import { LogoutOutlined } from "@ant-design/icons";
import { ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useState } from "react";
import classes from "../Header.module.scss";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Accounts = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/`, {
        state: { from: "" },
      });
    } catch (err) {
      // Optional: Handle error
    }
  };

  return (
    <>
      <Tooltip title="Logout" arrow>
        <div
          onClick={handleClick}
          className={classes.accountBtn}
          aria-controls={open ? "logout-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <LogoutOutlined className={classes.userIconSize} />
        </div>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="logout-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "150px",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogout} className="menuHover">
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <span className={classes.menuName}>Logout</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Accounts;
