import { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import classes from "./LoginModal.module.scss";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../../commoncomponents/InputBox/InputBox";
import Captcha from "../../commoncomponents/Captcha/Captcha";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useFormik } from "formik";
import JWTContext from "../../contexts/JWTContext";
import * as yup from "yup";
import { encodeData } from "../../utils/commonEnum";


const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`login-${index}`}
      aria-labelledby={`login-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mt={2}>
          {children}
        </Box>
      )}
    </div>
  );
};

const LoginModal = () => {
  const [value, setValue] = useState(0);
  const [isValidCaptcha, setIsValidCaptcha] = useState(false);
  const [generateCaptcha, setGenerateCaptcha] = useState(false);
  const { login } = useContext(JWTContext);
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState({
    vendorPassword: false,
  });

  const handlePasswordToggle = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Email is required"),
      password: yup.string().required("Password is required")
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  //Login Submit 
  const submitForm = async (values) => {
    
    try {
      const encodePassword = await encodeData(
        values.password
      );
      const loginSuccess = await login(
        values?.email,
        encodePassword
      );
      if (loginSuccess) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.log('error', error);

    }
  }

  return (
    <Grid container className="my-8 !justify-center">
      <Grid item xs={12} sm={8} md={6} lg={5}>
        <div className={`${classes.loginBox}`}>
          <div>

            <TabPanel value={value} index={0}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3} className="!-mt-3">
                  <Grid item xs={12}>
                    <InputBox
                      label={
                        <span>
                          Email Address<span className="lableStar">*</span>
                        </span>
                      }
                      size="small"
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={
                        formik.touched.email && formik.errors.email
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InputBox
                      size="small"
                      type={
                        passwordVisibility.vendorPassword ? "text" : "password"
                      }
                      label={
                        <span>
                          Password<span className="lableStar">*</span>
                        </span>
                      }
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password && Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              handlePasswordToggle("vendorPassword")
                            }
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {passwordVisibility.vendorPassword ? (
                              <EyeFilled className={`${classes.eyeIcon}`} />
                            ) : (
                              <EyeInvisibleFilled
                                className={`${classes.eyeIcon}`}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <span className={`${classes.captchaText}`}>
                      Enter the Captcha Below
                    </span>
                    <Captcha
                      isValidCaptcha={isValidCaptcha}
                      setIsValidCaptcha={setIsValidCaptcha}
                      isGenerate={generateCaptcha}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      size="medium"
                      className="btnCapital"
                      type="submit"
                      disabled={!isValidCaptcha}
                    >
                      LOGIN
                    </Button>

                    <p className={`${classes.registerDivide}`}>
                      Click here for Registration :
                      <Link to="/register" className={`${classes.registerText}`}>
                        Register
                      </Link>
                    </p>
                  </Grid>
                </Grid>
              </form>
            </TabPanel>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginModal;
