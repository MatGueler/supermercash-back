import joi from "joi";

const paymentSchema = joi.object({
  cardHolder: joi.string().required(),
  cardNumber: joi.string().length(16).required(),
  CVC: joi.string().length(3).required(),
  expiry: joi.string().required(),
  password: joi.string().min(6).required(),
  purchaseValue: joi.number().required(),
  quantifyProducts: joi.number().required(),
});

export default paymentSchema;
