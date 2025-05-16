const joi = require("joi");
const apiResponse = require("../helpers/apiResponse");
const validation = joi.object({
	name: joi.string()
		.pattern(/^[a-zA-Z ]+$/)
		.min(3)
		.max(50)
		.trim()
		.required()
		.messages({
			'string.empty': `Name cannot be an empty field`,
			'any.required': `Name is a required field`,
			'string.pattern.base': `Name must contain only letters and spaces`,
			'string.min': `Name length must be at least {{#limit}} characters long`,
			'string.max': `Name length must be less than or equal to {{#limit}} characters long`
		}),
	email: joi.string()
		.email()
		.trim()
		.required()
		.messages({
			'string.empty': `Email cannot be an empty field`,
			'any.required': `Email is a required field`,
			'string.email': `Email must be a valid email`,
		}),
	password: joi.string()
		.min(8)
		.trim()
		.required()
		.messages({
			'string.empty': `Password cannot be an empty field`,
			'any.required': `Password is a required field`,
			'string.min': `Password length must be at least {{#limit}} characters long`
		})
});

const userValidation = async (req, res, next) => {
	const payload = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	};

	const { error } = validation.validate(payload, { abortEarly: false });

	if (error) {
		const errorMessages = error.details.map(detail => detail.message).join(', ');
		return apiResponse.notAcceptableRequest(res, errorMessages);
	} else {
		next();
	}
};

module.exports = userValidation;
