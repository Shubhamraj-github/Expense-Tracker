const jwt = require("jsonwebtoken");
const cacheUtil = require('../helpers/cashe.js');
const apiResponse = require("../helpers/apiResponse");
const commonFunction = require("../helpers/utility.js");
const config = process.env;

const verifyToken = async (req, res, next) => {
    let token = req.headers["authorization"];
    req.body.deviceType = req.headers["device-type"];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim();
    }

    if (!token) {
        return apiResponse.forbiddenRequest(res, "A token is required for authentication.");
    }
    try {
        const isBlackListed = await cacheUtil.get(token);
        if (isBlackListed) {
            return apiResponse.unauthorizedResponse(res, "Unauthorized.");
        }
        const decryptedToken = await commonFunction.decryptToken(token);
        const decoded = jwt.verify(decryptedToken, config.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return apiResponse.unauthorizedResponse(res, "Invalid Token.");
    }
    next();
};

module.exports = verifyToken;