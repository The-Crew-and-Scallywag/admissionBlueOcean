DROP TABLE IF EXISTS interviewers;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS questions;


CREATE TABLE students (
  id                  SERIAL PRIMARY KEY,
  first_name          VARCHAR(25) NOT NULL,
  last_name           VARCHAR(25) NOT NULL,
  email               VARCHAR(75) UNIQUE NOT NULL,
  phone               INT NOT NULL,
  results             BOOLEAN[],
  notes               TEXT[],
  interview_date      DATE,
  interview_time      TIMETZ
);

CREATE TABLE interviewers (
  id                  SERIAL PRIMARY KEY,
  students_id         INT REFERENCES students(id) ON DELETE CASCADE,
  first_name          VARCHAR(25) NOT NULL,
  last_name           VARCHAR(25) NOT NULL,
  email               VARCHAR(75) UNIQUE NOT NULL,
  password            VARCHAR(100) NOT NULL
);

CREATE TABLE questions  (
  id                  SERIAL PRIMARY KEY,
  questions           TEXT NOT NULL
);
