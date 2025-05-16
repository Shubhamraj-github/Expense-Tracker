const db = require("../../config/database.js");
const { encryptDataWithoutSlash, decryptDataWithoutSlash } = require("../helpers/utility.js");



class ApplicationData {

    async addExpense(req) {
        const category = req.body?.category;
        const date = req.body?.date;
        const amount = req.body.amount;
        const description = req.body.description;
        const userID = req.user.userID;
        const expenseID = (req.body?.id) ? decryptDataWithoutSlash(req.body?.id) : '';

        const procedureName = "AddExpenses";

        try {
            const result = await db.execute(
                `CALL ${procedureName}(?, ?, ?, ?, ?, ?)`,
                [category, date, amount, description, userID, expenseID]
            );
            return result[0][0];
        } catch (error) {
            console.error('Error adding Expenses:', error);
            throw error;
        }
    }

    async getUser(req) {
        const name = req.body?.name || '';
        const page = req.body?.page || '';
        const size = req.body?.size || '';

        const procedureName = "GetAllUsersByName";

        try {
            const result = await db.execute(
                `CALL ${procedureName}(?, ?, ?)`,
                [name, page, size]
            );
            const encryptedUsers = result[0][0].map(user => ({
                ...user,
                id: encryptDataWithoutSlash(user.id)
            }));

            return [encryptedUsers, result[0][1]];
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
    async getCategoryList(req) {
        const procedureName = "GetCategoryList";
        try {
            const result = await db.execute(
                `CALL ${procedureName}()`,
                []
            );
            return result[0][0];
        } catch (error) {
            console.error('Error adding Expenses:', error);
            throw error;
        }
    }

    async getExpenseList(req) {
        const page = req.body?.page || '';
        const size = req.body?.size || '';
        const category = req.body?.category || '';
        const start_date = req.body?.start_date || '';
        const end_date = req.body?.end_date || '';
        const user_id = req.user.userType == 'user' ? req.body?.user_id :decryptDataWithoutSlash(req.body?.user_id);


        const procedureName = "GetExpenseListByUser";

        try {
            const result = await db.execute(
                `CALL ${procedureName}(?, ?, ?, ?, ?, ?)`,
                [page, size, category, start_date, end_date, user_id]
            );
            const encryptedUsers = result[0][0].map(user => ({
                ...user,
                id: encryptDataWithoutSlash(user.id)
            }));

            return [encryptedUsers, result[0][1]];
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    async getExpenseByUser(req) {
        const id = (req.body?.id) ? decryptDataWithoutSlash(req.body?.id) : '';
        // const userID = req.user.userID;
        const procedureName = "GetExpenseByUser";
        try {
            const result = await db.execute(
                `CALL ${procedureName}(?)`,
                [id]
            );
            return result[0][0];
        } catch (error) {
            console.error('Error fetching Expenses:', error);
            throw error;
        }
    }
    async deleteExpenseById(req) {
        const id = decryptDataWithoutSlash(req.body?.id);
        const procedureName = "DeleteExpenseById";
        try {
            const result = await db.execute(
                `CALL ${procedureName}(?)`,
                [id]
            );
            return result;
        } catch (error) {
            console.error('Error deleting Expenses:', error);
            throw error;
        }
    }

    async deleteUserById(req) {
        const id = decryptDataWithoutSlash(req.body?.id);
        const procedureName = "DeleteUserById";
        try {
            const result = await db.execute(
                `CALL ${procedureName}(?)`,
                [id]
            );
            return result;
        } catch (error) {
            console.error('Error deleting User:', error);
            throw error;
        }
    }
    async getTopThreeAmount(req) {
        const id = req.body?.id;
        const procedureName = "GetTopThreeExpensesByUser";
        try {
            const result = await db.execute(
                `CALL ${procedureName}(?)`,
                [id]
            );
            return result[0][0];
        } catch (error) {
            console.error('Error fetching amount:', error);
            throw error;
        }
    }
    async getMonthlyExpenseChange(req) {
        const id = req.body?.id;
        const procedureName = "GetUserMonthlySpendingChange";
        try {
            const result = await db.execute(
                `CALL ${procedureName}(?)`,
                [id]
            );
            return result[0][0];
        } catch (error) {
            console.error('Error fetching details:', error);
            throw error;
        }
    }
    async getPrediction(req) {
        const id = req.body?.id;
        const procedureName = "getSpendingPrediction";
        try {
            const result = await db.execute(
                `CALL ${procedureName}(?)`,
                [id]
            );
            return result[0][0];
        } catch (error) {
            console.error('Error fetching details:', error);
            throw error;
        }
    }
    async getCategoryWiseData(req) {
        // const id = req.body?.id;
        const procedureName = "GetTotalSpendByCategory";
        try {
            const result = await db.execute(
                `CALL ${procedureName}()`,
                []
            );
            return result[0][0];
        } catch (error) {
            console.error('Error fetching details:', error);
            throw error;
        }
    }
}

module.exports = ApplicationData;
