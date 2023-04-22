const { pool } = require("../db/db.js");

const models = {
  addClient: async (query, callback) => {
    const { coachId, clientEmail } = query;
    try {
      pool
        .query(
          `SELECT id
        FROM users
        WHERE email='${clientEmail}'`
        )
        .then((result) => {
          if (result.rows.length > 0) {
            const clientId = result.rows[0].id;

            pool
              .query(
                `INSERT INTO clientAssignments(
                client_id,
                coach_id
              )
              VALUES (
                ${clientId},
                ${coachId}
              )`
              )
              .then((result) => {
                callback(null, result);
              })
              .catch((error) => {
                callback(error, null);
              });
          } else {
            callback("Error adding connection", null);
          }
        });
    } catch (error) {
      callback(error, null);
    }
  },
  addWorkout: async (query, callback) => {
    const {
      clientId,
      date,
      workout_order,
      exercise,
      exerciseOrder,
      set,
      reps,
      rir,
      rpe,
      backoffPercent,
      weight,
    } = query;

    return pool.query(
      `INSERT INTO workouts(
        client_id,
        date,
        workout_order,
        exercise,
        exercise_order,
        set,
        reps,
        rir,
        rpe,
        backoff_percent,
        weight
      )
      VALUES (
        ${clientId},
        '${date}',
        ${workout_order},
        '${exercise}',
        ${exerciseOrder},
        ${set},
        ${reps},
        ${rir},
        ${rpe},
        ${backoffPercent},
        ${weight}
      )`
    );
  },
  createUser: async (query, callback) => {
    try {
      pool
        .query(
          `INSERT INTO users(
          firebase_id,
          email,
          user_type,
          name
        )
        VALUES (
          '${query.id}',
          '${query.email}',
          '${query.userType}',
          '${query.name}'
        )`
        )
        .then((result) => {
          callback(null, result);
        });
    } catch (error) {
      callback(error, null);
    }
  },
  deleteWorkout: async (query, callback) => {
    const { clientId, date } = query;
    try {
      pool
        .query(
          `
        DELETE FROM workouts
        WHERE client_id=${clientId}
        AND date='${date}'
      `
        )
        .then((result) => {
          callback(null, result);
        });
    } catch (error) {
      callback(error, null);
    }
  },
  editWorkouts: async (query, callback) => {
    const { workout, clientId, date } = query;

    try {
      // console.log(workout)
      workout.forEach((slot, i) => {
        const { exercise } = slot;

        slot.sets.forEach((set, j) => {
          const { id, reps, rir, rpe, backoffPercent, weight } = set;

          const setData = {
            clientId: clientId,
            date: date,
            exercise: exercise === "" || undefined ? null : exercise,
            exerciseOrder: i,
            set: j,
            reps: reps === "" || undefined ? null : reps,
            rir: rir === "" || undefined ? null : rir,
            rpe: rpe === "" || undefined ? null : rpe,
            backoffPercent:
              backoffPercent === "" || undefined ? null : backoffPercent,
            weight: weight === "" || undefined ? null : weight,
          };

          pool
            .query(`SELECT * FROM workouts WHERE id=${id}`)
            .then((result) => {
              console.log("it exists");
              pool
                .query(
                  `
                UPDATE workouts
                SET
                exercise='${setData.exercise}',
                reps=${setData.reps},
                rir=${setData.rir},
                rpe=${setData.rpe},
                backoff_percent=${setData.backoffPercent},
                weight=${setData.weight}
                WHERE
                id=${id}
              `
                )
                .then((result) => {
                  console.log("successful update");
                  // callback(null, result)
                })
                .catch((error) => {
                  console.log("error in updating row");
                  callback(error, null);
                });
            })
            .catch((error) => {
              console.log("it doesnt exist");
              pool
                .query(
                  `INSERT INTO workouts(
                  client_id,
                  date,
                  exercise,
                  exercise_order,
                  set,
                  reps,
                  rir,
                  rpe,
                  backoff_percent,
                  weight
                )
                VALUES (
                  ${setData.clientId},
                  '${setData.date}',
                  '${setData.exercise}',
                  ${setData.exerciseOrder},
                  ${setData.set},
                  ${setData.reps},
                  ${setData.rir},
                  ${setData.rpe},
                  ${setData.backoffPercent},
                  ${setData.weight}
                )`
                )
                .then((result) => {
                  console.log("successful addition");
                })
                .catch((error) => {
                  callback(error, null);
                });
            });
        });
      });
      callback(null, true);
    } catch (error) {
      callback(error, null);
    }
  },
  getAllClients: async (query, callback) => {
    const coachId = query;

    try {
      const clients = await pool.query(
        `SELECT * FROM clientassignments
        WHERE coach_id=${coachId}`
      );

      if (clients.rows.length === 0) {
        callback(null, {});
      } else {
        const allClientsData = {};

        for (let i = 0; i < clients.rows.length; i++) {
          const clientId = clients.rows[i].client_id;
          const client = await pool.query(
            `SELECT * FROM users WHERE id=${clientId}`
          );
          const { name } = client.rows[0];

          allClientsData[clientId] = {
            name: name,
            workouts: {},
          };

          const workouts = await pool.query(
            `SELECT * FROM workouts WHERE client_id=${clientId}`
          );

          workouts.rows.forEach((entry) => {
            const {
              id,
              date,
              exercise,
              exercise_order,
              set,
              reps,
              rir,
              rpe,
              backoff_percent,
              weight,
            } = entry;

            const setStructure = {
              id: id,
              reps: reps,
              rir: rir,
              rpe: rpe,
              backoffPercent: backoff_percent,
              weight: weight,
            };

            // workout exists on that date
            if (allClientsData[clientId].workouts[date]) {
              const currWorkout = allClientsData[clientId].workouts[date];

              if (currWorkout[exercise_order] !== undefined) {
                const currExercise = currWorkout[exercise_order];
                currExercise.sets[set] = setStructure;
              } else {
                currWorkout[exercise_order] = {
                  exercise: exercise,
                  sets: [],
                };
                currWorkout[exercise_order].sets[set] = setStructure;
              }
            } else {
              // workout doesn't exist yet
              allClientsData[clientId].workouts[date] = [];
              const currWorkout = allClientsData[clientId].workouts[date];
              currWorkout[exercise_order] = {
                exercise: exercise,
                sets: [],
              };
              const currWorkoutSets = currWorkout[exercise_order].sets;
              currWorkoutSets[set] = setStructure;
            }
          });
        }
        callback(null, allClientsData);
      }
    } catch (error) {
      callback(error, {});
    }
  },
  getUser: async (query, callback) => {
    try {
      const user = await pool.query(
        `SELECT * FROM users
        WHERE firebase_id='${query.id}'`
      );
      if (user.rows.length === 0) {
        callback(null, {});
      } else {
        callback(null, user.rows);
      }
    } catch (error) {
      callback(error, null);
    }
  },
  getWorkoutOrder: async (query) => {
    const { clientId, date } = query;
    let workout_order = 0;
    return pool.query(
      `SELECT * FROM workouts WHERE client_id=${clientId} AND date='${date}'`
    );
  },
  getWorkouts: async (query, callback) => {
    try {
      const workouts = await pool.query(
        `SELECT * FROM workouts
        WHERE client_id=${query}`
      );
      if (workouts.rows.length === 0) {
        callback(null, {});
      } else {
        callback(null, workouts.rows);
      }
    } catch (error) {
      callback(error, null);
    }
  },
  postWorkoutResult: async (workout) => {
    const {
      clientId,
      date,
      workout_order,
      exercise,
      exerciseOrder,
      set,
      reps,
      rir,
      rpe,
      backoffPercent,
      weight,
    } = workout;

    return pool.query(
      `INSERT INTO workoutresults(
        client_id,
        date,
        workout_order,
        exercise,
        exercise_order,
        set,
        reps,
        rir,
        rpe,
        backoff_percent,
        weight
      )
      VALUES (
        ${clientId},
        '${date}',
        ${workout_order},
        '${exercise}',
        ${exerciseOrder},
        ${set},
        ${reps},
        ${rir},
        ${rpe},
        ${backoffPercent},
        ${weight}
      )`
    );
  },
};

module.exports.models = models;

// when we add a workout, also add a workoutresult with exact same values
// client makes a GET for both the assignment and result;
// use the assignment for shorthand views
// use the result to populate all fields; make sure to send set id along with every set
// when updating, look up set id and make a direct update
