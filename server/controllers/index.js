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
    const { clientId, date, workout } = req.body;
    const workoutData = [];
    workout.forEach(slot => {
      const exercise = slot.exercise;

      slot.sets.forEach((set, i) => {
        const { reps, rir, backoffPercent, weight } = set

        const setData = {
          clientId: clientId,
          date: date,
          exercise: exercise,
          set: i,
          reps: reps,
          rir: rir ?? '',
          backoffPercent: backoffPercent ?? '',
          weight: weight ?? '',
        }

        models.addWorkout(setData, (err, data) => {
          if (err) {
            console.log('Error adding workout', err)
            res.status(404).end();
          }
          console.log(data)
          workoutData.push(data)
        })
      })
    })
    res.status(201).end(JSON.stringify(workoutData));
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