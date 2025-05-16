import {
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Button } from "@mui/material";
import {useNavigate } from "react-router-dom";

const TopMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="wrapper flex justify-between">
        <nav>
          <input type="checkbox" id="show-menu" />
          <label htmlFor="show-menu" className="menu-icon">
            <MenuFoldOutlined className="text-subtitle1" />
          </label>

          <div className="nav-content">
            <ul className="links">
              
              <li>
                <a className="nav-login">
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => navigate("/")}
                    className="btnStyle"
                  >
                    Login
                  </Button>
                </a>
                <a className="nav-login">
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => navigate("/register")}
                    className="btnStyle"
                  >
                    Register
                  </Button>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default TopMenu;
