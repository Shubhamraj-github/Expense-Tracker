import classes from "./Header.module.scss";
import Container from "../../commoncomponents/Container/Container";
import TopMenu from "./TopMenu/TopMenu";
import { Link } from "react-router-dom";
import logo from '../../../public/assets/peetpooja.png'
const Header = () => {
  return (
    <header className={`${classes.header}`}>
      <div className={`${classes.headerSeparate}`}>
        <Container classname={`${classes.containDivide}`}>
          <Link to="/">
             <img className={`${classes.mainlogos}`} style={{ height: '75px' }} alt="Logo" src={logo} /> 
          </Link>
          <div className={`${classes.rightSection}`}>
            <TopMenu />
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
