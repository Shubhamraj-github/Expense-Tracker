const db = require("../../config/database.js");
const utility = require('../helpers/utility.js');

class AuthData {

    async registration(req) {
        const p_name = req.body?.name;
        const p_email = req.body?.email;
        const password = utility.decryptData(req.body?.password);
        const p_password = utility.setPassword(password);

        const procedureName = "RegisterUser";

        try {
            const result = await db.execute(
                `CALL ${procedureName}(?, ?, ?)`,
                [p_name, p_email, p_password]
            );


            return result[0][0];
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }

    async login(req) {
        const p_email = req.body?.email;

        const procedureName = "Login";

        try {
            const result = await db.execute(
                `CALL ${procedureName}(?)`,
                [p_email]
            );


            return result[0][0];
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }

    async getProfile(req) {
        const p_userID = req.user.userID;
        const procedureName = "GetUserProfile";
        try {
            const result = await db.execute(
                `CALL ${procedureName}(?)`,
                [p_userID]
            );


            return result[0][0];
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
}

module.exports = AuthData;
