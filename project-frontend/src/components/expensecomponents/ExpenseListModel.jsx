import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Autocomplete,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import TablePagination from "../../commoncomponents/TablePagination/TablePagination";
import BadgeStatus from "../../commoncomponents/BadgeStatus/BadgeStatus";
import { Link, useParams } from "react-router-dom";
import TableSorting from "../../commoncomponents/TableSorting/TableSorting";
import CommonDialog from "../../pages/CommonDialog";
import {formatDateupdated, StatusCode } from "../../utils/commonEnum";
import Breadcrumb from "../../commoncomponents/Breadcrumb/Breadcrumb";
import { useSnackbar } from "../../utils/SnackbarProvider";
import TotalRecords from "../../commoncomponents/TablePagination/TotalRecords";
import InputBox from "../../commoncomponents/InputBox/InputBox";
import { useFormik } from "formik";
import { deleteExpenseById, getCategoryList, getExpenseList } from "../../api/application";
import useAuth from "../../hooks/useAuth";

const UserListingModel = () => {
  const { showSnackbar } = useSnackbar();

  const [pageCount, setPageCount] = useState(0);
  const [paginationSize, setPaginationSize] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);
  const [expenseList, setExpenseList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [errorAlert, setErrorAlert] = useState("delete");
  const [categoryList, setCategoryList] = useState([]);
  const { user } = useAuth();
  const { id } = useParams();

  const tableHeading = [
    { id: "sNo", header: "S.No." },
    { id: "category_name", header: "Category" },
    { id: "amount", header: "Amount" },
    { id: "description", header: "Description" },
    { id: "date", header: "Date" },
    { id: "action", header: "Action" },
  ];


  const [visibleColumns] = useState(
    tableHeading.reduce((acc, column) => {
      acc[column.id] = true;
      return acc;
    }, {})
  );

  const empListingdata = {
    title: "Expense List",
  };

  const deleteClose = () => setDialogOpen(false);

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (id) {
      try {
        const response = await deleteExpenseById({ id });
        if (response.statusCode === StatusCode.success) {
          showSnackbar(response.message, "success");
          fetchExpense();
        } else {
          showSnackbar(response.message, "error");
        }
      } catch (error) {
        showSnackbar("Something went wrong!", "error");
      }
    }
    deleteClose();
  };

  const changeStatusClick = (row) => {
    const updated = expenseList.map((user) =>
      user.id === row.id ? { ...user, status: user.status === 1 ? 0 : 1 } : user
    );
    setExpenseList(updated);
    showSnackbar("Status changed successfully", "success");
  };

  function getPageSize(size) {
    setPaginationSize(size);
  }

  function getPageCount(page) {
    setSelectedPage(parseInt(page));
  }

  const formik = useFormik({
    initialValues: {
      category: "",
      start_date: "",
      end_date: "",
    },
    onSubmit: () => {
      fetchExpense();
    },
  });

  const fetchExpense = async () => {
    try {
      const response = await getExpenseList({
        size: paginationSize,
        page: selectedPage,
        category: formik.values.category,
        start_date: formik.values.start_date,
        end_date: formik.values.end_date,
        user_id: user.user_type == 'user' ? user.id : id
      });

      if (response.statusCode === StatusCode.success) {
        const fetchedData = response?.data?.[0] || [];
        const paginationInfo = response?.data?.[1]?.[0] || {};
        setExpenseList(fetchedData);
        setTotalRecords(paginationInfo.total_count || 0);
        setPageCount(paginationInfo.total_page || 0);
        showSnackbar(response.message, "success");
      } else {
        showSnackbar(response.message || "Failed to load users", "error");
      }
    } catch (error) {
      showSnackbar(error.message || "An error occurred", "error");
    }
  };

  useEffect(() => {
    fetchExpense();
  }, [selectedPage, paginationSize]);

 const handleReset = async () => {
  await formik.setFieldValue('category', '');
  await formik.setFieldValue('start_date', '');
  await formik.setFieldValue('end_date', '');
  setSelectedPage(1);
  fetchExpense();
  
};

  const paginatedData = expenseList;

  const getCategory = async () => {
    const response = await getCategoryList()
    if (response.status = StatusCode.success) {
      setCategoryList(response.data)
    }
  }

  useEffect(() => {
    getCategory();
  }, [])

  return (
    <>
      <Grid container item xs={12} spacing={2}>
        <Grid container item xs={12} sm={4} md={4} lg={4}>
          <Autocomplete
            fullWidth
            size="small"
            className="searchAutoBox"
            options={Array.isArray(categoryList) ? categoryList : []}
            value={
              categoryList.find((item) => item.id === formik.values.category) || null
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
        </Grid >
        <Grid container item xs={12} sm={4} md={3} lg={2}>
          <InputBox
            size="small"
            type="date"
            label="From Date"
            name="start_date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            value={formik.values.start_date}
          />
        </Grid>

        <Grid container item xs={12} sm={4} md={3} lg={2}>
          <InputBox
            size="small"
            type="date"
            label="To Date"
            name="end_date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            value={formik.values.end_date}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={4}
          md={3}
          lg={2}
          sx={{
            justifyContent: { lg: "flex-end" },
            flexWrap: "nowrap"
          }}
        >
          <Button
            variant="contained"
            color="success"
            size="small"
            className="btnStyle"
            onClick={() => formik.handleSubmit()}
          >
            Search
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            color="success"
            size="small"
            className="btnStyle"
            onClick={handleReset}
          >
            Reset
          </Button>
          &nbsp;&nbsp;
        </Grid>
      </Grid>

      <Grid container item xs={12} className="headingSeparate" marginTop={"2%"}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Breadcrumb {...empListingdata} />
        </Grid>
      </Grid>

      <div className="mb-5 w-full">
        <TotalRecords totalRecords={totalRecords} />
      </div>

      <Grid item xs={12}>
        <TableContainer component={Paper} className="tableShadow">
          <TableSorting tableData={paginatedData} initialOrderBy="name">
            {({ order, orderBy, tablesBody, handleSortRequest }) => (
              <Table size="small">
                <TableHead className="tableHeads">
                  <TableRow>
                    {tableHeading.map(
                      (column) =>
                        visibleColumns[column.id] && (
                          <TableCell
                            key={column.id}
                            className="tableAdminStyle"
                            sortDirection={orderBy === column.id ? order : false}
                          >
                            {column.header !== "Action" ? (
                              <TableSortLabel
                                active={orderBy === column.id}
                                direction={orderBy === column.id ? order : "asc"}
                                onClick={() => handleSortRequest(column.id)}
                              >
                                {column.header}
                              </TableSortLabel>
                            ) : (
                              column.header
                            )}
                          </TableCell>
                        )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tablesBody && tablesBody.length > 0 ? (
                    tablesBody.map((row, index) => (
                      <TableRow key={index} className="tableOdd">
                        {tableHeading.map(
                          (column) =>
                            visibleColumns[column.id] && (
                              <TableCell key={column.id} className="tableAdminCellStyle">
                                {column.id === "status" ? (
                                  <Link onClick={() => changeStatusClick(row)}>
                                    <BadgeStatus variant={row.status === 1 ? "active" : "deactive"}>
                                      {row.status === 1 ? "Active" : "Inactive"}
                                    </BadgeStatus>
                                  </Link>
                                ) : column.id === "sNo" ? (
                                  index + 1 + (selectedPage - 1) * paginationSize
                                ) : column.id === "date" ? (
                                  formatDateupdated(row.date)
                                ) : column.id !== "action" ? (
                                  row[column.id]
                                ) : (
                                  <>
                                    <Link
                                      to={`/add-expense/${row.id}`}
                                      state={{ row }}
                                    >
                                      <Tooltip title="Edit" arrow>
                                        <EditOutlined className="editIcons" />
                                      </Tooltip>
                                    </Link>
                                    <Tooltip title="Delete" arrow>
                                      <Link onClick={() => confirmDelete(row.id)}>
                                        <DeleteOutlined className="deleteIcons" />
                                      </Link>
                                    </Tooltip>
                                  </>
                                )}
                              </TableCell>
                            )
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={tableHeading.length} className="!text-center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </TableSorting>
        </TableContainer>

        <TablePagination
          pageCount={pageCount}
          selectedPage={selectedPage}
          paginationSize={paginationSize}
          getPageSize={getPageSize}
          getPageCount={getPageCount}
          maxPage={pageCount}
        />
      </Grid>

      <CommonDialog
        open={dialogOpen}
        onClose={deleteClose}
        title=""
        content={"Are you sure, you want to delete?"}
        actions={
          <>
            <Button
              variant="outlined"
              className="!mr-1"
              color="primary"
              size="small"
              onClick={deleteClose}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleDelete(userToDelete)}
            >
              Yes, sure
            </Button>
          </>
        }
        errorAlert={errorAlert}
      />
    </>
  );
};

export default UserListingModel;