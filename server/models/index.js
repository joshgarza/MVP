const { pool } = require('../db/db.js');

module.exports = {
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
    const { clientId, date, exercise, set, reps, rir, backoffPercent, weight } = query
    try {
      pool.query(
        `INSERT INTO workouts(
          client_id,
          date,
          exercise,
          set,
          reps,
          rir,
          backoffPercent,
          weight
        )
        VALUES (
          ${clientId},
          '${date}',
          '${exercise}',
          '${set}',
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
          const { name } = client.rows[i]

          allClientsData[clientId] = {
            name: name,
            workouts: {},
          };

          const workouts = await pool.query(`SELECT * FROM workouts WHERE client_id=${clientId}`)

          workouts.rows.forEach(entry => {
            const { date, exercise, set, reps, rir, backoffPercent, weight } = entry;

            if (allClientsData[clientId].workouts[date]) {
              workoutExists.push({
                exercise: exercise,
                set: set,
                reps: reps,
                rir: rir,
                weight: weight,
                backoffPercent: backoffPercent
              })
            } else {
              allClientsData[clientId].workouts[date] = [{
                exercise: exercise,
                set: set,
                reps: reps,
                rir: rir,
                weight: weight,
                backoffPercent: backoffPercent
              }]
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