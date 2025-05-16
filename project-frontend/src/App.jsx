import "./styles/index.scss";
import Layout from "./layouts/Layout";
import { Box } from "@mui/material";
import Loader from "./commoncomponents/Loader/LoaderCommon";

function App() {
  return (
    <Layout>
      <Box id='appCommonLoader'>
					<Loader />
      </Box>
    </Layout>
  );
}

export default App;
