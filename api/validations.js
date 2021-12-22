const Joi = require('joi');

const validateRegister = (body) => {
    const registerSchema = Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().required().min(5),
        password: Joi.string().min(6).max(20).required()
    });

    return registerSchema.validate(body);
}

const validateLogin = (body) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required()
    });

    return loginSchema.validate(body);
}

const validateShoePost = (body) => {
    const shoeValidationSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().max(200).required(),
        price: Joi.number().required(),
        image: Joi.string()
    });

    return shoeValidationSchema.validate(body);
}

module.exports = {
    validateRegister,
    validateLogin,
    validateShoePost
}

