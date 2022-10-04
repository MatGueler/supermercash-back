import joi from "joi";

const UpdateUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required().label("Email must be valid email"),
  adress: joi.string(),
  phone: joi.string().length(11),
});

export default UpdateUserSchema;
