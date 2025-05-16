const ApplicationData = require("../dataLayer/application.data");
const applicationData = new ApplicationData();

class ApplicationManager {

	 async addExpense(req) {
        try {
            const userRes = await applicationData.addExpense(req);
            if (userRes && userRes.length > 0) {
                return userRes;
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
	 async getUser(req) {
        try {
            const userRes = await applicationData.getUser(req);
            if (userRes && userRes.length > 0) {
                return userRes;
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }

    async getCategoryList(req) {
        try {
            const userRes = await applicationData.getCategoryList(req);
            if (userRes && userRes.length > 0) {
                return userRes;
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }

     async getExpenseList(req) {
        try {
            const userRes = await applicationData.getExpenseList(req);
            if (userRes && userRes.length > 0) {
                return userRes;
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }

    async getExpenseByUser(req) {
        try {
            const userRes = await applicationData.getExpenseByUser(req);
            if (userRes && userRes.length > 0) {
                return userRes;
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }

    async deleteExpenseById(req) {
        try {
            const userRes = await applicationData.deleteExpenseById(req);
            if (userRes && userRes.length > 0) {
                return userRes;
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }

    async deleteUserById(req) {
        try {
            const userRes = await applicationData.deleteUserById(req);
            if (userRes && userRes.length > 0) {
                return userRes;
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
    async getTopThreeAmount(req) {
        try {
            const userRes = await applicationData.getTopThreeAmount(req);
            if (userRes && userRes.length > 0) {
                return userRes;
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
    async getMonthlyExpenseChange(req) {
        try {
            const userRes = await applicationData.getMonthlyExpenseChange(req);
            if (userRes && userRes.length > 0) {
                return userRes;
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
    async getPrediction(req) {
        try {
            const userRes = await applicationData.getPrediction(req);
            if (userRes && userRes.length > 0) {
                return userRes;
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
    async getCategoryWiseData(req) {
        try {
            const userRes = await applicationData.getCategoryWiseData(req);
            if (userRes && userRes.length > 0) {
                return userRes;
            }
        } catch (error) {
            let errorLog = error.name + ": " + error.message;
            console.log(errorLog)
        }
    }
}

module.exports = ApplicationManager;
