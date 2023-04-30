const { models } = require("../models");

module.exports = {
  test: (req, res) => {
    res.status(200).end();
  },
  addClient: (req, res) => {
    models.addClient(req.body.data, (err, data) => {
      if (err) {
        console.log("Error adding client", err);
        res.status(404).end();
      }
      res.status(201).end();
    });
  },
  addWorkout: (req, res) => {
    const { clientId, date, workout } = req.body;

    const query = {
      clientId: clientId,
      date: date,
    };

    let workout_order = 0;

    models.getWorkoutOrder(query).then((result) => {
      // Increment workout order on multiple workouts for a given date
      result.rows?.forEach((row, i) => {
        workout_order = Math.max(workout_order, row.workout_order + 1);
      });

      workout.forEach((slot, i) => {
        const exercise = slot.exercise;

        slot.sets.forEach((set, j) => {
          const { reps, rir, backoffPercent, weight, rpe } = set;

          const setData = {
            clientId: clientId,
            date: date,
            workout_order: workout_order,
            exercise: exercise,
            exerciseOrder: i,
            set: j,
            reps: reps === "" ? null : reps,
            rir: rir === "" ? null : rir,
            rpe: rpe === "" ? null : rpe,
            backoffPercent: backoffPercent === "" ? null : backoffPercent,
            weight: weight === "" ? null : weight,
          };

          models
            .addWorkout(setData)
            .then((result) => {
              console.log("successful addition workout assignment");
              models
                .postWorkoutResult(setData)
                .then((result) => {
                  console.log("successful addition workout result");
                  res.status(201).end();
                })
                .catch((error) => {
                  console.log("error adding workout", error);
                  res.status(404).end();
                });
            })
            .catch((error) => {
              console.log("error adding workout", error);
              res.status(404).end();
            });
        });
      });
    });
  },
  checkGoogleUser: (req, res) => {
    console.log("receiving request", req.query);
    let query = {
      id: req.query.firebaseId,
    };
    models.getUser(query, (err, data) => {
      if (err) {
        console.log("Error getting user info", err);
        res.status(404).end();
      }
      console.log(data);
      res.status(200).send(data);
    });
  },
  createUser: (req, res) => {
    let user = {
      name: req.body.params.name,
      email: req.body.params.email,
      id: req.body.params.firebaseId,
      userType: req.body.params.userType,
    };
    models.createUser(user, (err, data) => {
      if (err) {
        console.log("Error creating user", err);
        res.status(404).end();
      }
    });
    res.status(201).end();
  },
  deleteWorkout: (req, res) => {
    models.deleteWorkout(req.body, (err, data) => {
      if (err) {
        console.log("Error deleting workout:", err);
        res.status(404).end();
      }
      res.status(204).end();
    });
  },
  editWorkouts: (req, res) => {
    console.log("incoming body", req.body.workout[0]);
    models.editWorkouts(req.body, (err, data) => {
      if (err) {
        console.log("Error editing workout:", err);
        res.status(404).end();
      }
      res.status(201).end();
    });
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
        console.log("Error getting all clients", err);
        res.status(404).end();
      }
      res.status(200).send(data);
    });
  },
  getSingleWorkout: (req, res) => {
    console.log(req.query, "checking single workout");
    models
      .getSingleWorkout(req.query)
      .then((result) => {
        console.log(result.rows);
        res.status(200).send(result.rows);
      })
      .catch((error) => {
        console.log("error getting workout", error);
        res.status(404).send(error);
      });
  },
  getWorkoutByDate: (req, res) => {
    models
      .getWorkoutByDate(req.query)
      .then((result) => res.status(200).send(result.rows))
      .catch((error) => res.status(404).end());
  },
  getWorkouts: (req, res) => {
    models.getWorkouts(req.params.id, (err, data) => {
      if (err) {
        console.log("Error getting workouts", err);
        res.status(404).end();
      }
      res.status(200).send(data);
    });
  },
  getWorkoutResults: (req, res) => {
    models.getWorkoutResults(req.params.id, (err, data) => {
      if (err) {
        console.log("Error getting workouts", err);
        res.status(404).end();
      }
      res.status(200).send(data);
    });
  },
  loginUser: (req, res) => {
    let user = {
      email: req.query.email,
      id: req.query.firebaseId,
    };
    models.getUser(user, (err, data) => {
      if (err) {
        console.log("Error getting user info", err);
        res.status(404).end();
      }
      console.log(data);
      res.status(200).send(data);
    });
  },
  updateWorkoutResult: (req, res) => {
    const { id, reps, rir, rpe, weight, backoff_percent } = req.body;
    const exerciseSet = {
      id: id,
      reps:
        reps === "" || reps === null || reps === NaN ? null : parseInt(reps),
      rir: rir === "" || rir === null || rir === NaN ? null : parseInt(rir),
      rpe: rpe === "" || rpe === null || rpe === NaN ? null : parseInt(rpe),
      backoff_percent:
        backoff_percent === "" ||
        backoff_percent === null ||
        backoff_percent === NaN
          ? null
          : parseInt(backoff_percent),
      weight:
        weight === "" || weight === null || weight === NaN
          ? null
          : parseInt(weight),
    };

    console.log(exerciseSet);

    models
      .updateWorkoutResult(exerciseSet)
      .then((result) => res.status(201).end())
      .catch((error) => res.status(404).end());
  },
};
