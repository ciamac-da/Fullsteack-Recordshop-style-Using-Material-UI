var Users = require('../models/User');

exports.getUsers = async (req, res, next) => {
  // Schreib hier code um alle Kunden aus der users-Collection zu holen
  var users = await Users.find()

  res.status(200).send(users);
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  // Schreib hier code um den Kunden mit der id aus params aus der users-Collection zu holen
  var user = await Users.findById(id)
  res.status(200).send(user);
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  // Schreib hier code um den Kunden mit der id aus params aus der users-Collection zu löschen
  var user = await Users.findByIdAndDelete(id)
  res.status(200).send(user);
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const dt = req.body;
  // Schreib hier code um den User mit der id aus params in der users-Collection mit den Daten aus req.body zu aktualisieren
  var user = await Users.findByIdAndUpdate(id, dt, {new: true})
  res.status(200).send(user);
};

exports.addUser = async (req, res, next) => {
  const data = req.body;
  // Schreib hier code um die Daten des neuen Kunden aus req.body in der users-Collection zu speichern
  var user = new Users(data)
  await user.save()
  res.status(200).send(user);
};
