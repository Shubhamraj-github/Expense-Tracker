
const AuthData = require("../dataLayer/auth.data.js");
const utility = require('../helpers/utility.js');
const jwt = require("jsonwebtoken");
const authData = new AuthData();
/**
 * Auth Manager.
 */
class AuthManager {

    async registration(req) {
        try {
            const userRes = await authData.registration(req);
            if (userRes && userRes.length > 0) {
                return userRes;
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
    async login(req) {
        try {
            const userRes = await authData.login(req);

            if (userRes && userRes.length > 0) {
                if (userRes[0]?.flag == 1 || userRes[0]?.flag == 2) {
                    return userRes;
                } else {
                    const decodedPassword = utility.decryptData(req.body.password);
                    if (utility.authenticate(decodedPassword, userRes[0].password)) {
                        let data = {
                            userID: userRes[0].id,
                            userType: userRes[0].user_type,
                            status: userRes[0].status,
                        }
                        delete userRes[0].password;
                        const jwtPayload = data;
                        const jwtData = {
                            expiresIn: process.env.JWT_TIMEOUT_DURATION,
                        };
                        const secret = process.env.JWT_SECRET;
                        userRes[0].token = utility.encryptData((jwt.sign(jwtPayload, secret, jwtData)));
                    } else {
                        userRes[0].flag = 4
                        return userRes;
                    }
                    return userRes;
                }
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }

     async getProfile(req) {
        try {
            const userRes = await authData.getProfile(req);
            if (userRes && userRes.length > 0) {
                return userRes;
            }
        } catch (error) {
           let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }

}




module.exports = AuthManager;
