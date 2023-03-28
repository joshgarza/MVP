const models = require('../models');

const userControllers = {
  loginUser: (req, res) => {
    let user = {
      email: req.query.email,
      id: req.query.firebaseId
    }
    models.getUser(user, (err, data) => {
      if (err) {
        console.log('Error getting user info', err)
        res.status(404).end()
      }
      res.status(200).send(data)
    })
  },
  createUser: (req, res) => {
    let user = {
      email: req.body.params.email,
      id: req.body.params.firebaseId,
      userType: req.body.params.userType
    }
    models.createUser(user, (err, data) => {
      if (err) {
        console.log('Error creating user', err)
        res.status(404).end()
      }
      res.status(201).end()
    })
  },
  addWorkout: (req, res) => {
    console.log(req.body['Mon Mar 27 2023'][0].sets)
    res.status(201).end();
    // for (let assignment of req.body.assignment) {
    //   const workout = {
    //     clientId: req.body.clientId,
    //     exercise: assignment.exercise,
    //     reps: assignment.reps,
    //     rpe: assignment.rpe ?? '',
    //     sets: assignment.sets ?? '',
    //     weight: assignment.weight ?? ''
    //   }
    //   models.addWorkout(workout, (err, data) => {
    //     if (err) {
    //       console.log('Error adding workout', err)
    //       res.status(404).end();
    //     }
    //     console.log(data)
    //     res.status(201).end();
    //   })
    // }
  },
  getWorkouts: (req, res) => {
    models.getWorkouts(req.params.id, (err, data) => {
      if (err) {
        console.log('Error getting workouts', err)
        res.status(404).end();
      }
      console.log(data)
      res.status(200).send(data);
    })
  }
}

module.exports.userControllers = userControllers;