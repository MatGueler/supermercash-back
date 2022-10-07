import joi from "joi";

const registerSchema = joi.object({
  name: joi.string().required().label("Name is required"),
  email: joi.string().email().required().label("Email must be valid email"),
  password: joi
    .string()
    .min(6)
    .required()
    .label("Password must be length at least equal to 6"),
  confirmPassword: joi
    .string()
    .min(6)
    .required()
    .label("Password confirmation must be length at least equal to 6"),
});

export default registerSchema;
