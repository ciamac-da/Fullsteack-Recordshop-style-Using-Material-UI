var Orders = require('../models/Order')

exports.getOrders = async (req, res, next) => {
  var orders = await Orders.find()
  res.status(200).send(orders);
};

exports.getOrder = async (req, res, next) => {
  const { id } = req.params;
  // Schreib hier code um die Bestellung mit der id aus params aus der orders-Collection zu holen
  var order = await Orders.findById(id)
  res.status(200).send(order);
};

exports.deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  // Schreib hier code um die Bestellung mit der id aus params aus der orders-Collection zu löschen
  var order = await Orders.findByIdAndDelete(id)
  res.status(200).send(order);
};

exports.updateOrder = async (req, res, next) => {
  const { id } = req.params;
  const dt = req.body;
  // Schreib hier code um die Bestellung mit der id aus params in der orders-Collection mit den Daten aus req.body zu aktualisieren
  var order = await Orders.findByIdAndUpdate(id, dt, {new: true})
  res.status(200).send(order);
};

exports.addOrder =async (req, res, next) => {
  const data = req.body;
  // Schreib hier code um die Daten der neuen Bestellungen aus req.body in der orders-Collection zu speichern
  var order = new Orders(data)
  await order.save()
  res.status(200).send(order);
};
