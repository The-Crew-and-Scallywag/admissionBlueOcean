DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS interviewers;
DROP TABLE IF EXISTS users;


CREATE TABLE students (
  id                  SERIAL PRIMARY KEY,
  first_name          VARCHAR(25) NOT NULL,
  last_name           VARCHAR(25) NOT NULL,
  email               VARCHAR(75) UNIQUE NOT NULL,
  prev_attempt        BOOLEAN[]
);

CREATE TABLE interviewers (
  id                  SERIAL PRIMARY KEY,
  students_id         INT REFERENCES students(id),
  first_name          VARCHAR(25) NOT NULL,
  last_name           VARCHAR(25) NOT NULL,
  email               VARCHAR(75) UNIQUE NOT NULL
  -- password            VARCHAR(100) NOT NULL,
);

CREATE TABLE notes  (
  id                  SERIAL PRIMARY KEY,
  interviewers_id     INT REFERENCES interviewers(id),
  note                TEXT 
);
