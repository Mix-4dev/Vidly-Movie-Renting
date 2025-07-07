const Joi = require("joi");

function validateCustomer(customer) {
  const customerSchema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    phoneNumber: Joi.number().min(7).max(15).required(),
    isGold: Joi.boolean(),
  });
  return customerSchema.validate( customer, { abortEarly: false } );
}
module.exports = validateCustomer;