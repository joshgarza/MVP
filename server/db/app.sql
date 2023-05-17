-- \i db/app.sql to run this file from psql prompt


-- Connect to DB and create schema
CREATE DATABASE trainer;
\c trainer;

-- DROP TABLE workouts;
-- DROP TABLE clients;
-- DROP TABLE coaches;
-- DROP TABLE users;

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  firebase_id VARCHAR(40) NOT NULL,
  email VARCHAR(320) NOT NULL,
  user_type VARCHAR(25) NOT NULL,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS clientAssignments(
  client_id INT UNIQUE REFERENCES users (id),
  coach_id INT REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS workouts(
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES users (id),
  coach_id INT REFERENCES users (id),
  date VARCHAR(100) NOT NULL,
  workout_order INT NOT NULL,
  exercise VARCHAR(100) NOT NULL,
  exercise_order INT NOT NULL,
  set INT NOT NULL,
  amsap BOOLEAN NOT NULL,
  reps INT NOT NULL,
  rir INT,
  rpe INT,
  backoff_percent INT,
  max_percent INT,
  e1rm_percent INT,
  weight INT
);
CREATE TABLE IF NOT EXISTS workoutResults(
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES users (id),
  coach_id INT REFERENCES users (id),
  date VARCHAR(100) NOT NULL,
  workout_order INT NOT NULL,
  exercise VARCHAR(100) NOT NULL,
  exercise_order INT NOT NULL,
  set INT NOT NULL,
  amsap BOOLEAN NOT NULL,
  reps INT NOT NULL,
  rir INT,
  rpe INT,
  backoff_percent INT,
  max_percent INT,
  e1rm_percent INT,
  weight INT
);