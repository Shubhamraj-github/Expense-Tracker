import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="mainLayout">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
