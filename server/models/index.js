const { pool } = require('../db/db.js');

module.exports = {
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
  createUser: async (query, callback) => {
    try {
      pool.query(
        `INSERT INTO users(
          firebase_id,
          email,
          user_type
        )
        VALUES (
          '${query.id}',
          '${query.email}',
          '${query.userType}'
        )`
      ).then(result => {
        callback(null, result);
      })
    } catch (error) {
      callback(error, null);
    }
  },
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
              `INSERT INTO clients(
                id,
                coach_id
              )
              VALUES (
                ${clientId},
                ${coachId}
              )`
            ).then(result => {
              callback(null, result);
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
  getAllClients: async (query, callback) => {
    try {
      const allClientsData = await pool.query(
        `SELECT * FROM workouts`
      )
      if (allClientsData.rows.length === 0) {
        callback(null, {});
      } else {
        callback(null, allClientsData.rows)
      }
    } catch (error) {
      callback(error, null)
    }
  }
}