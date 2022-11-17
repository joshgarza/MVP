-- Connect to DB and create schema
CREATE DATABASE IF NOT EXISTS trainer;
\c trainer;

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  firebase_id VARCHAR(40) NOT NULL,
  email VARCHAR(320) NOT NULL,
  user_type VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS workouts(
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES users (id),
  exercise VARCHAR(100) NOT NULL,
  reps VARCHAR(3) NOT NULL,
  rpe VARCHAR(3),
  sets VARCHAR(3),
  weight VARCHAR(4)
)