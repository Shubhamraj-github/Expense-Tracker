import { Autocomplete, Checkbox, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./LoginModal.module.scss";
import InputBox from "../../commoncomponents/InputBox/InputBox";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import * as Yup from "yup";
import { commonLoader, encodeData, regexChar, StatusCode } from "../../utils/commonEnum";
import { useSnackbar } from "../../utils/SnackbarProvider";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { registrationFunc } from "../../api/auth";

const RegistrationModel = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
  });

  const handlePasswordToggle = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };


  // Validation schema 
  const validationSchema = Yup.object({
    p_name: Yup.string().required("Name is required"),
    p_email: Yup.string()
      .when("id", {
        is: (id) => !id,
        then: (schema) => schema
          .email("Invalid Email")
          .required("Email is Required"),
        otherwise: (schema) => schema.notRequired()
      }),
    p_password: Yup.string()
      .when("id", {
        is: (id) => !id,
        then: (schema) => schema
          .required("Password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
          ),
        otherwise: (schema) => schema.notRequired()
      }),
    confirm_password: Yup.string()
      .when("id", {
        is: (id) => !id,
        then: (schema) => schema
          .oneOf([Yup.ref("p_password"), null], "Passwords must match")
          .required("Confirm Password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
          ),
        otherwise: (schema) => schema.notRequired()
      }),
  });

  const formik = useFormik({
    initialValues: {
      p_name: "",
      p_email: "",
      p_password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const submitForm = async (values) => {
    const encodePassword = await encodeData(values.p_password);

    const updatedFormData = {
      name: values?.p_name,
      email: values?.p_email,
      password: encodePassword,
    };

    const response = await registrationFunc(updatedFormData);

    if (response.statusCode === StatusCode.success) {
      showSnackbar(response?.message, "success");
      navigate('/');
    } else {
      commonLoader("hide");
      showSnackbar(response.message, "error");
    }
  };

  return (
    <>
      {loading ? (
        <div className="mt-80 flex justify-center items-center">
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Grid container className={`${classes.registerGrid}`}>
            <Grid container item xs={12} sm={10} md={10} lg={8}>
              <h1 className={`${classes.registerTitle}`}>Registration Form</h1>

              {/* basic details */}
              <Grid container item xs={12}>
                <h2 className={`${classes.subTitle}`}>Basic Details</h2>
              </Grid>

              <Grid
                container
                rowSpacing={{ xs: 2 }}
                columnSpacing={{ xs: 3 }}
                className="!items-start"
              >
                <Grid container spacing={2.5} item xs={12} sm={6}>
                  <Grid container item xs={12}>
                    <InputBox
                      size="small"
                      type="text"
                      label={
                        <span>
                          Name
                          <span className="lableStar">*</span>
                        </span>
                      }
                      name="p_name"
                      value={formik.values.p_name}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (regexChar.test(value)) {
                          formik.setFieldValue('p_name', value);
                        }
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.p_name &&
                        Boolean(formik.errors.p_name)
                      }
                      helperText={
                        formik.touched.p_name && formik.errors.p_name
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>



                <Grid container spacing={2.5} item xs={12} sm={6}>
                  <Grid item xs={12}>
                    <InputBox
                      label={
                        <span>
                          Email<span className="lableStar">*</span>
                        </span>
                      }
                      size="small"
                      type="text"
                      placeholder=""
                      name="p_email"
                      value={formik.values.p_email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.p_email &&
                        Boolean(formik.errors.p_email)
                      }
                      helperText={
                        formik.touched.p_email && formik.errors.p_email
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid container item xs={12}>
                  </Grid>
                </Grid>
              </Grid>

              {/* password details */}
              {!id && <Grid container item xs={12}>
                <h2 className={`${classes.subTitle} mt-5`}>Password</h2>
              </Grid>}

              <Grid
                container
                rowSpacing={{ xs: 2 }}
                columnSpacing={{ xs: 3 }}
                className="!items-start"
              >
                {!id && <Grid container spacing={2.5} item xs={12} sm={6}>
                  <Grid container item xs={12}>
                    <InputBox
                      label={
                        <span>
                          Password<span className="lableStar">*</span>
                        </span>
                      }
                      size="small"
                      type={
                        passwordVisibility.oldPassword ? "text" : "password"
                      }
                      placeholder=""
                      name="p_password"
                      value={formik.values.p_password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.p_password &&
                        Boolean(formik.errors.p_password)
                      }
                      helperText={
                        formik.touched.p_password && formik.errors.p_password
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              handlePasswordToggle("oldPassword")
                            }
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {passwordVisibility.oldPassword ? (
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
                </Grid>}

                {!id && <Grid container spacing={2.5} item xs={12} sm={6}>
                  <Grid container item xs={12}>
                    <InputBox
                      label={
                        <span>
                          Confirm Password<span className="lableStar">*</span>
                        </span>
                      }
                      size="small"
                      type={
                        passwordVisibility.newPassword ? "text" : "password"
                      }
                      placeholder=""
                      name="confirm_password"
                      value={formik.values.confirm_password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.confirm_password &&
                        Boolean(formik.errors.confirm_password)
                      }
                      helperText={
                        formik.touched.confirm_password && formik.errors.confirm_password
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              handlePasswordToggle("newPassword")
                            }
                            onMouseDown={(e) => e.preventDefault()} 
                          >
                            {passwordVisibility.newPassword ? (
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
                </Grid>}
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className={`${classes.formBtn}`}
              >
                <Button
                  variant="contained"
                  size="large"
                  color="success"
                  className="btnStyle"
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};

export default RegistrationModel;
