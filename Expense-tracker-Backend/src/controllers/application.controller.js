const apiResponse = require("../helpers/apiResponse");
const ApplicationManager = require('../manager/application.manager.js')


const applicationManager = new ApplicationManager()
class ApplicationController {

    async addExpense(req, res) {
        try {
            let result = await applicationManager.addExpense(req);
            if (result && result.length > 0) {
                if (result[0].flag == 1) {
                    return apiResponse.successResponseWithData(res, " Expense added successfully", result);
                }
                else if (result[0].flag == 2) {
                    return apiResponse.successResponseWithData(res, " Expense updated successfully", result);
                }
            } else {
                return apiResponse.successResponse(res, "No Data Found.")
            }
        } catch (error) {
            console.error(error);
            return apiResponse.expectationFailedResponse(res, "An unexpected error occurred.");
        }
    }
    async getUser(req, res) {
        try {
            let result = await applicationManager.getUser(req);
            if (result && result.length > 0) {
                return apiResponse.successResponseWithData(res, "User List Fetched Successfully", result);
            }
            else {
                return apiResponse.successResponse(res, "No Data Found.")
            }
        } catch (error) {
            console.error(error);
            return apiResponse.expectationFailedResponse(res, "An unexpected error occurred.");
        }
    }

      async getCategoryList(req, res) {
        try {
            let result = await applicationManager.getCategoryList(req);
            if (result && result.length > 0) {
                return apiResponse.successResponseWithData(res, "Category List Fetched Successfully", result);
            }
            else {
                return apiResponse.successResponse(res, "No Data Found.")
            }
        } catch (error) {
            console.error(error);
            return apiResponse.expectationFailedResponse(res, "An unexpected error occurred.");
        }
    }

      async getExpenseList(req, res) {
        try {
            let result = await applicationManager.getExpenseList(req);
            if (result && result.length > 0) {
                return apiResponse.successResponseWithData(res, "Expense List Fetched Successfully", result);
            }
            else {
                return apiResponse.successResponse(res, "No Data Found.")
            }
        } catch (error) {
            console.error(error);
            return apiResponse.expectationFailedResponse(res, "An unexpected error occurred.");
        }
    }
    async getExpenseByUser(req, res) {
        try {
            let result = await applicationManager.getExpenseByUser(req);
            if (result && result.length > 0) {
                return apiResponse.successResponseWithData(res, "Expense Details Fetched Successfully", result);
            }
            else {
                return apiResponse.successResponse(res, "No Data Found.")
            }
        } catch (error) {
            console.error(error);
            return apiResponse.expectationFailedResponse(res, "An unexpected error occurred.");
        }
    }

    async deleteExpenseById(req, res) {
        try {
            let result = await applicationManager.deleteExpenseById(req);
            if (result && result.length > 0) {
                return apiResponse.successResponseWithData(res, "Expense Details Deleted Successfully", result);
            }
            else {
                return apiResponse.successResponse(res, "No Data Found.")
            }
        } catch (error) {
            console.error(error);
            return apiResponse.expectationFailedResponse(res, "An unexpected error occurred.");
        }
    }

    async deleteUserById(req, res) {
        try {
            let result = await applicationManager.deleteUserById(req);
            if (result && result.length > 0) {
                return apiResponse.successResponseWithData(res, "Users Deleted Successfully", result);
            }
            else {
                return apiResponse.successResponse(res, "No Data Found.")
            }
        } catch (error) {
            console.error(error);
            return apiResponse.expectationFailedResponse(res, "An unexpected error occurred.");
        }
    }
    async getTopThreeAmount(req, res) {
        try {
            let result = await applicationManager.getTopThreeAmount(req);
            if (result && result.length > 0) {
                return apiResponse.successResponseWithData(res, "Amount Fetched Successfully", result);
            }
            else {
                return apiResponse.successResponse(res, "No Data Found.")
            }
        } catch (error) {
            console.error(error);
            return apiResponse.expectationFailedResponse(res, "An unexpected error occurred.");
        }
    }
    async getMonthlyExpenseChange(req, res) {
        try {
            let result = await applicationManager.getMonthlyExpenseChange(req);
            if (result && result.length > 0) {
                return apiResponse.successResponseWithData(res, "Details Fetched Successfully", result);
            }
            else {
                return apiResponse.successResponse(res, "No Data Found.");
            }
        } catch (error) {
            console.error(error);
            return apiResponse.expectationFailedResponse(res, "An unexpected error occurred.");
        }
    }
    async getPrediction(req, res) {
        try {
            let result = await applicationManager.getPrediction(req);
            if (result && result.length > 0) {
                return apiResponse.successResponseWithData(res, "Details Fetched Successfully", result);
            }
            else {
                return apiResponse.successResponse(res, "No Data Found.");
            }
        } catch (error) {
            console.error(error);
            return apiResponse.expectationFailedResponse(res, "An unexpected error occurred.");
        }
    }
    async getCategoryWiseData(req, res) {
        try {
            let result = await applicationManager.getCategoryWiseData(req);
            if (result && result.length > 0) {
                return apiResponse.successResponseWithData(res, "Details Fetched Successfully", result);
            }
            else {
                return apiResponse.successResponse(res, "Error while fetching details .");
            }
        } catch (error) {
            console.error(error);
            return apiResponse.expectationFailedResponse(res, "An unexpected error occurred.");
        }
    }
}

module.exports = { ApplicationController }