import { Autocomplete, Checkbox, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../AuthModal/LoginModal.module.scss";
import InputBox from "../../commoncomponents/InputBox/InputBox";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { commonLoader, regexNumerical, StatusCode } from "../../utils/commonEnum";
import { useSnackbar } from "../../utils/SnackbarProvider";
import { addExpenses, getCategoryList, getExpenseByUser } from "../../api/application";

const addExpense = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const [categoryList, setCategoryList] = useState([]);

    // Validation schema using Yup
    const validationSchema = Yup.object({
        category: Yup.string().required("Category is required"),
        date: Yup.string().required("Date is required"),
        amount: Yup.string().required("Amount is required"),
        description: Yup.string().required("Description is required"),
    });

    const formik = useFormik({
        initialValues: {
            category: '',
            date: '',
            amount: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submitForm(values);
        },
    });

    const submitForm = async (values) => {

        const response = await addExpenses({
            ...values,
            id: id
        });

        if (response.statusCode === StatusCode.success) {
            showSnackbar(response?.message, "success");
            navigate('/dashboard');
        } else {
            commonLoader("hide");
            showSnackbar(response.message, "error");
        }
    };


    const getCategory = async () => {
        const response = await getCategoryList()
        if (response.status = StatusCode.success) {
            setCategoryList(response.data)
        }
    }

    useEffect(() => {
        getCategory();
    }, [])

    const getExpense = async () => {
        const response = await getExpenseByUser({
            id: id
        })
        if (response.status = StatusCode.success) {
            formik.setFieldValue('category', response?.data[0]?.category)
            formik.setFieldValue('amount', response?.data[0]?.amount)
            const formatDate = (isoDate) => isoDate.split('T')[0];
            formik.setFieldValue('date', formatDate(response?.data[0]?.date));
            formik.setFieldValue('description', response?.data[0]?.description)
        }
    }

    useEffect(() => {
        if (id) {
            getExpense();
        }
    }, [])

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container className={`${classes.registerGrid}`}>
                    <Grid container item xs={12} sm={10} md={10} lg={8}>
                        <h1 className={`${classes.registerTitle}`}>Expense Form</h1>
                        <Grid container item xs={12}>
                            <h2 className={`${classes.subTitle}`}>Expense Details</h2>
                        </Grid>

                        <Grid
                            container
                            rowSpacing={{ xs: 2 }}
                            columnSpacing={{ xs: 3 }}
                            className="!items-start"
                        >
                            <Grid container spacing={2.5} item xs={12} sm={6}>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        fullWidth
                                        size="small"
                                        className="searchAutoBox"
                                        options={Array.isArray(categoryList) ? categoryList : []}
                                        value={
                                            categoryList.find((item) => String(item.id) === String(formik.values.category)) || null
                                        }
                                        onChange={(event, value) => {
                                            formik.setFieldValue("category", value ? value.id : "");
                                        }}
                                        getOptionLabel={(option) => option.name || ""}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Category"
                                                variant="outlined"
                                                size="small"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid container item xs={12}>
                                    <InputBox
                                        size="small"
                                        type="date"
                                        label={
                                            <span>
                                                Date
                                                <span className="lableStar">*</span>
                                            </span>
                                        }
                                        name="date"
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.date && Boolean(formik.errors.date)}
                                        helperText={formik.touched.date && formik.errors.date}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                            </Grid>

                            <Grid container spacing={2.5} item xs={12} sm={6}>
                                <Grid container item xs={12}>
                                    <InputBox
                                        size="small"
                                        type="text"
                                        label={
                                            <span>
                                                Amount
                                                <span className="lableStar">*</span>
                                            </span>
                                        }
                                        name="amount"
                                        value={formik.values.amount}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (regexNumerical.test(value)) {
                                                formik.setFieldValue('amount', value);
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                                        helperText={formik.touched.amount && formik.errors.amount}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid container item xs={12}>
                                    <InputBox
                                        size="small"
                                        type="text"
                                        label={
                                            <span>
                                                Description
                                                <span className="lableStar">*</span>
                                            </span>
                                        }
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
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


        </>
    );
};

export default addExpense;
