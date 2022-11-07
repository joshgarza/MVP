const models = require('../models');

const userControllers = {
  loginUser: (req, res) => {
    let user = {
      email: req.query.email,
      id: req.query.firebaseId
    }
    res.status(200).send(user)
  },
  createUser: (req, res) => {
    let user = {
      email: req.query.email,
      id: req.query.firebaseId,
      userType: req.query.userType
    }
    res.status(201).end()
  }
}

module.exports.userControllers = userControllers;