import { fetcherPost } from "../utils/axios";

// All API endpoints
export const endpoints = {
  key: "application",
  addExpense: "/addExpense",
  getUser: '/getUser',
  getCategoryList: '/getCategoryList',
  getExpenseList: '/getExpenseList',
  getExpenseByUser: '/getExpenseByUser',
  deleteExpenseById: '/deleteExpenseById',
  deleteUserById: '/deleteUserById',
  getTopThreeAmount: '/getTopThreeAmount',
  getMonthlyExpenseChange: '/getMonthlyExpenseChange',
  getPrediction:'/getPrediction',
  getCategoryWiseData:'/getCategoryWiseData',
};

// Add a new expense
export async function addExpenses(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.addExpense,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// Get user details
export async function getUser(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.getUser,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// Get list of categories
export async function getCategoryList(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.getCategoryList,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// Get full expense list
export async function getExpenseList(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.getExpenseList,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// Get expenses by specific user
export async function getExpenseByUser(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.getExpenseByUser,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// Delete expense by ID
export async function deleteExpenseById(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.deleteExpenseById,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// Get top three highest expense amounts
export async function getTopThreeAmount(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.getTopThreeAmount,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// Get monthly change in expenses
export async function getMonthlyExpenseChange(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.getMonthlyExpenseChange,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// Delete user by user ID
export async function deleteUserById(formValue) {

  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.deleteUserById,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// Get expense prediction data
export async function getPrediction(formValue) {
  
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.getPrediction,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// Get data grouped by category
export async function getCategoryWiseData(formValue) {
  
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.getCategoryWiseData,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}