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
  user_type VARCHAR(25) NOT NULL
);

-- CREATE TABLE IF NOT EXISTS coaches(
--   id INT REFERENCES users (id)
-- );

CREATE TABLE IF NOT EXISTS clients(
  id INT REFERENCES users (id),
  coach_id INT REFERENCES users (id)
);


CREATE TABLE IF NOT EXISTS workouts(
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES users (id),
  coach_id INT REFERENCES users (id),
  date VARCHAR(100) NOT NULL,
  exercise VARCHAR(100) NOT NULL,
  set VARCHAR(3) NOT NULL,
  reps VARCHAR(3) NOT NULL,
  rir VARCHAR(3),
  backoffPercent VARCHAR(3),
  weight VARCHAR(4)
);