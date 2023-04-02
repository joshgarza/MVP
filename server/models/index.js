const { pool } = require('../db/db.js');

const addWorkoutHelper = (workout, clientId, date) => {
  const workoutData = [];

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

      this.addWorkout(setData, (err, data) => {
        if (err) {
          console.log('Error adding workout', err)
        }
        workoutData.push(data)
      })

    })
  })
  return workoutData
}

const models = {
  addClient: async (query, callback) => {
    const { coachId, clientEmail } = query;
    try {
      pool.query(
        `SELECT id
        FROM users
        WHERE email='${clientEmail}'`
      ).then(result => {
          if (result.rows.length > 0) {
            const clientId = result.rows[0].id;

            pool.query(
              `INSERT INTO clientAssignments(
                client_id,
                coach_id
              )
              VALUES (
                ${clientId},
                ${coachId}
              )`
            ).then(result => {
              callback(null, result);
            }).catch(error => {
              callback(error, null);
            })
          } else {
            callback('Error adding connection', null)
          }
        })
    } catch (error) {
      callback(error, null);
    }
  },
  addWorkout: async (query, callback) => {
    const { clientId, date, exercise, exerciseOrder, set, reps, rir, backoffPercent, weight } = query
    try {
      pool.query(
        `INSERT INTO workouts(
          client_id,
          date,
          exercise,
          exercise_order,
          set,
          reps,
          rir,
          backoff_percent,
          weight
        )
        VALUES (
          ${clientId},
          '${date}',
          '${exercise}',
          ${exerciseOrder},
          ${set},
          '${reps}',
          '${rir}',
          '${backoffPercent}',
          '${weight}'
        )`
      )
      callback(null, query)
    } catch (error) {
      callback(error, null);
    }
  },
  createUser: async (query, callback) => {
    try {
      pool.query(
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
      ).then(result => {
        callback(null, result);
      })
    } catch (error) {
      callback(error, null);
    }
  },
  editWorkouts: async (query, callback) => {
    const { workout, clientId, date } = query;

    try {
      // console.log(workout)
      workout.forEach((slot, i) => {
        const { exercise } = slot
        console.log(exercise)
        slot.sets.forEach((set, j) => {
          const { id, reps, rir, backoffPercent, weight } = set;
          console.log(set)
          pool.query(`
            UPDATE workouts
            SET
            exercise='${exercise}',
            reps='${reps}',
            rir='${rir}',
            backoff_percent='${backoffPercent}',
            weight='${weight}'
            WHERE
            id=${id}
          `).then(result => {
            callback(null, result)
          }).catch(error => {
            callback(error, null)
          })
        })
      })
    } catch(error) {
      callback(error, null)
    }


  },
  getAllClients: async (query, callback) => {
    const coachId = query;

    try {
      const clients = await pool.query(
        `SELECT * FROM clientassignments
        WHERE coach_id=${coachId}`
      )

      if (clients.rows.length === 0) {
        callback(null, {});
      } else {
        const allClientsData = {};

        for (let i = 0; i < clients.rows.length; i++) {
          const clientId = clients.rows[i].client_id;
          const client = await pool.query(`SELECT * FROM users WHERE id=${clientId}`)
          const { name } = client.rows[0]

          allClientsData[clientId] = {
            name: name,
            workouts: {},
          };

          const workouts = await pool.query(`SELECT * FROM workouts WHERE client_id=${clientId}`)

          workouts.rows.forEach(entry => {
            const { id, date, exercise, exercise_order, set, reps, rir, backoff_percent, weight } = entry;

            const setStructure = {
              id: id,
              reps: reps,
              rir: rir,
              backoffPercent: backoff_percent,
              weight: weight
            }

            // workout exists on that date
            if (allClientsData[clientId].workouts[date]){
              const currWorkout = allClientsData[clientId].workouts[date];

              if (currWorkout[exercise_order] !== undefined) {
                const currExercise = currWorkout[exercise_order];
                currExercise.sets[set] = setStructure;
              } else {
                currWorkout[exercise_order] = {
                  exercise: exercise,
                  sets: []
                }
                currWorkout[exercise_order].sets[set] = setStructure;
              }
            } else {
              // workout doesn't exist yet
              allClientsData[clientId].workouts[date] = [];
              const currWorkout = allClientsData[clientId].workouts[date]
              currWorkout[exercise_order] = {
                exercise: exercise,
                sets: []
              }
              const currWorkoutSets = currWorkout[exercise_order].sets;
              currWorkoutSets[set] = setStructure;
            }
          })
        }
        callback(null, allClientsData)
      }
    } catch (error) {
      callback(error, {})
    }
  },
  getUser: async (query, callback) => {
    try {
      const user = await pool.query(
        `SELECT * FROM users
        WHERE firebase_id='${query.id}'`
      )
      if (user.rows.length === 0) {
        callback(null, {});
      } else {
        callback(null, user.rows);
      }
    } catch (error) {
      callback(error, null);
    }
  },
  getWorkouts: async (query, callback) => {
    try {
      const workouts = await pool.query(
        `SELECT * FROM workouts
        WHERE client_id=${query}`
      )
      if (workouts.rows.length === 0) {
        callback(null, {});
      } else {
        callback(null, workouts.rows)
      }
    } catch (error) {
      callback(error, null)
    }
  },
}

module.exports.models = models;