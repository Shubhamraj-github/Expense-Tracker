const apiResponse = require("../helpers/apiResponse");
const AuthManager = require('../manager/auth.manager.js')

const authManager = new AuthManager();

class AuthController {

    async registration(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            let result = await authManager.registration(req);

            if (result) {
                const flag = result[0].result_flag;

                if (flag == 1) {
                    return apiResponse.conflictRequest(res, "User Already Exists.");
                } else if (flag == 2) {
                    return apiResponse.successResponseWithData(res, "Registration Success.");
                } else {
                    return apiResponse.forbiddenRequest(res, "Unexpected response from DB.");
                }
            } else {
                return apiResponse.forbiddenRequest(res, "Error while registering user.");
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async login(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            let result = await authManager.login(req);
            if (result && result.length > 0) {
                const flag = [result[0].flag];
                if (flag == 1) {
                    return apiResponse.notFoundResponse(res, "Email does not exist.");
                } else if (flag == 2) {
                    return apiResponse.forbiddenRequest(res, "User is deleted.");
                } else if (flag == 3) {
                    return apiResponse.successResponseWithData(res, "Login Successful.", result);
                } else if (flag == 4) {
                    return apiResponse.unauthorizedResponse(res, "Password did not match.");
                } else {
                    return apiResponse.forbiddenRequest(res, "Unexpected response from DB.");
                }
            } else {
                return apiResponse.forbiddenRequest(res, "Error while checking user credentials.");
            }
        } catch (error) {
            console.error(error);
            return apiResponse.expectationFailedResponse(res, "An unexpected error occurred.");
        }
    }

    async getProfile(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            let result = await authManager.getProfile(req);
            if (result && result.length > 0) {
                return apiResponse.successResponseWithData(res, "Profile Data Fetched Successfully", result);
            } else {
                return apiResponse.forbiddenRequest(res, "Error while checking user profile.");
            }
        } catch (error) {
            console.error(error);
            return apiResponse.expectationFailedResponse(res, "An unexpected error occurred.");
        }
    }
}

module.exports = { AuthController };

