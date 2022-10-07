import joi from "joi";

const loginSchema = joi.object({
  email: joi.string().email().required().label("Email must be valid email"),
  password: joi
    .string()
    .min(6)
    .required()
    .label("Password must be length at least equal to 6"),
});

export default loginSchema;
