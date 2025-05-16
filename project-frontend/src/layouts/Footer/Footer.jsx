import classes from "./Footer.module.scss";
import Container from "../../commoncomponents/Container/Container";


const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <>
      <div className={`${classes.footerBottombg}`}>
        <Container>
          <p className={`${classes.copyrightText}`}>
            Copyright &copy; {getCurrentYear()} SHUBHAM RAJ
          </p>
        </Container>
      </div>
    </>
  );
};

export default Footer;
