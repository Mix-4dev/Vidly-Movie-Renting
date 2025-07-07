const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model("customer",new mongoose.Schema({
  name: { type: String, required: true, minlength:3, maxlength: 25 },
  isGold: { type: Boolean, default: false },
  phone: { type: String, required: true, minlength: 7, maxlength: 15 },
  })
);

function validateCustomer (customer) {
  const customerSchema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    phone: Joi.string().min(7).max(15).required(),
    isGold: Joi.boolean(),
  });

  return customerSchema.validate( customer, { abortEarly: false } );
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;

