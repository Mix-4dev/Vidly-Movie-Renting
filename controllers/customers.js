const {Customer, validateCustomer} = require("../models/customer");

const getCustomers = async (req, res) => {
  const allCustomers = await Customer.find({}, {}).sort({ name: 1 });
  res.send(allCustomers);
}

const getCustomer = async (req, res) => {
  const customer = await Customer.findById(req.params.id, {name:1, phone:1, isGold:1, _id:1});
  res.send(customer);
}

const addCustomer =  async (req, res) => {
  const { error, value } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let newCustomer = new Customer({ name: value.name, isGold: value.isGold, phone: value.phone });
  newCustomer = await newCustomer.save();
  res.send(newCustomer);
}

const updateCustomer = async (req, res) => {
  const { error, value } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, { name: value.name, isGold: value.isGold, phone: value.phone }, { new: true });
  if (!customer) return res.status(404).send("Resource not found");
  res.send(customer);
}

const deleteCustomer =  async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).send("Resource not found");
  res.send(customer);
}
module.exports = {
  getCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
}