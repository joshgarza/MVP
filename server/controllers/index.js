const { models } = require('../models');

module.exports = {
  addClient: (req, res) => {
    models.addClient(req.body, (err, data) => {
      if (err) {
        console.log('Error adding client', err)
        res.status(404).end()
      }
      console.log(data)
      res.status(201).end();
    })
  },
  addWorkout: (req, res) => {
    const { clientId, date, workout } = req.body;
    const workoutData = [];
    console.log(workout)
    workout.forEach((slot, i) => {
      const exercise = slot.exercise;

      slot.sets.forEach((set, j) => {
        const { reps, rir, backoffPercent, weight } = set

        const setData = {
          clientId: clientId,
          date: date,
          exercise: exercise,
          exerciseOrder: i,
          set: j,
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
          workoutData.push(data)
        })
      })
    })
    if (workout.length === 0) {
      res.status(404).end()
    } else {
      res.status(201).end(JSON.stringify(workoutData));
    }
  },
  createUser: (req, res) => {
    let user = {
      name: req.body.params.name,
      email: req.body.params.email,
      id: req.body.params.firebaseId,
      userType: req.body.params.userType
    }
    models.createUser(user, (err, data) => {
      if (err) {
        console.log('Error creating user', err)
        res.status(404).end()
      }
    })
    res.status(201).end()
  },
  editWorkouts: (req, res) => {
    models.editWorkouts(req.body, (err, data) => {
      if (err) {
        console.log('Error editing workout:', err)
        res.status(404).end();
      }
      res.status(201).end()
    })
  },
  getAllClients: (req, res) => {
    const coachId = req.params.id;

    // {
    //   '1': {
    //     name: 'name',
    //     workouts: {
    //       'exact date': [
    //         {
    //           exercise: exercise,
    //           set: set,
    //           reps: reps,
    //           rir: rir,
    //           weight: weight,
    //           backoffPercent: backoffPercent
    //         }
    //       ]
    //     }
    //   }
    // }

    models.getAllClients(coachId, (err, data) => {
      if (err) {
        console.log('Error getting all clients', err)
        res.status(404).end();
      }
      res.status(200).send(data)
    })
  },
  getWorkouts: (req, res) => {
    models.getWorkouts(req.params.id, (err, data) => {
      if (err) {
        console.log('Error getting workouts', err)
        res.status(404).end();
      }
      res.status(200).send(data);
    })
  },
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
}