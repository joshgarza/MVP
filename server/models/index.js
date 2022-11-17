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
  addWorkout: async (query, callback) => {
    try {
      pool.query(
        `INSERT INTO workouts(
          client_id,
          exercise,
          reps,
          rpe,
          sets,
          weight
        )
        VALUES (
          ${query.clientId},
          '${query.exercise}',
          '${query.reps}',
          '${query.rpe}',
          '${query.sets}',
          '${query.weight}'
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
  }
}