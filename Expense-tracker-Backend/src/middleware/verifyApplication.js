const apiResponse = require("../helpers/apiResponse");


const verifyApplication = async (req, res, next) => {
    try {
        req.body.deviceType = req.headers["device-type"];

        if (req.user.userType == 'admin') {
            console.log("Valid User");
            return next(); 
        }

        // If user is invalid
        return apiResponse.unauthorizedResponse(res, "Invalid User Access.");
    } catch (err) {
        return apiResponse.unauthorizedResponse(res, "Unexpected error during validation.");
    }
};

module.exports = {
    verifyApplication,
};