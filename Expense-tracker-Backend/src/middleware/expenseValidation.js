const joi = require("joi");
const apiResponse = require("../helpers/apiResponse");

const expenseValidationSchema = joi.object({
	category: joi.number()
		.required()
		.messages({
			'any.required': 'Category is required',
		}),

	date: joi.date()
		.max('now')
		.required()
		.messages({
			'date.base': 'Date must be a valid date',
			'date.max': 'Date cannot be in the future',
			'any.required': 'Date is required',
		}),

	amount: joi.number()
		.positive()
		.required()
		.messages({
			'number.base': 'Amount must be a number',
			'number.positive': 'Amount must be greater than 0',
			'any.required': 'Amount is required',
		}),

	description: joi.string()
		.max(500)
		.required()
		.messages({
			'string.empty': 'Description cannot be empty',
			'any.required': 'Description is required',
			'string.max': 'Description must be at most 500 characters',
		}),

	expenseID: joi.alternatives()
		.try(joi.number().integer(), joi.string().allow(''))
		.optional()
});

const validateExpense = (req, res, next) => {
	const payload = {
		category: req.body.category,
		date: req.body.date,
		amount: req.body.amount,
		description: req.body.description,
		expenseID: req.body.expenseID || ''
	};

	const { error } = expenseValidationSchema.validate(payload, { abortEarly: false });

	if (error) {
		const errorMessages = error.details.map(detail => detail.message).join(', ');
		return apiResponse.notAcceptableRequest(res, errorMessages);
	} else {
		next();
	}
};

module.exports = validateExpense;
