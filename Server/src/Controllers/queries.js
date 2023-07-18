/**
 * Queries For The Students
 */
// get all student
export const allStudents = `SELECT * FROM students`;

// get student by id
export const student = `SELECT * FROM students WHERE id = $1`;

// post a new student
export const postStudent = `INSERT INTO students(first_name, last_name, email, phone)
VALUES($1, $2, $3, $4) RETURNING *`;

// patch student data
export const patchStudent = `UPDATE students SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), email = COALESCE($3, email), phone = COALESCE($4, phone)
WHERE id = $5 RETURNING *`;

// deletes students from db
export const deleteStudent = `DELETE FROM students WHERE id = $1`;
/**
 * Queries For The interviewers
 */
// GET all interiewers
export const allInterviewers = `SELECT first_name, last_name, email FROM interviewers`;

// GET interviewers by id
export const interiewersById = `SELECT first_name, last_name, email FROM interviewers WHERE id = $1`;

// GETs all Interviews
export const allInterviews = `
SELECT interviewers.first_name AS i_first_name, interviewers.last_name AS i_last_name, interviewers.email AS i_email,
students.first_name AS s_first_name, students.last_name AS s_last_name, students.phone AS s_phone, students.email AS s_email, students.id AS s_id,
interviews.question_notes AS q_notes, interviews.notes AS notes, interviews.results AS results, interviews.interview_date
FROM interviews 
JOIN interviewers ON interviewers.id = interviews.interviewers_id 
JOIN students ON students.id = interviews.students_id
ORDER BY interviews.interview_date DESC`;

// Patch interview data
export const patchInterviewData = `UPDATE interviews SET notes = COALESCE ($1, notes), results = COALESCE($2, results) WHERE id = $3 RETURNING *`;

// GETs all interviews for a specific student
export const interviewsByStudents = `
SELECT interviewers.first_name AS i_first_name, interviewers.last_name AS i_last_name, interviewers.email AS i_email,
students.first_name AS s_first_name, students.last_name AS s_last_name, students.phone AS s_phone, students.email AS s_email, students.id AS s_id,
interviews.question_notes AS q_notes, interviews.notes AS notes, interviews.results AS results, interviews.interview_date, interviews.id AS interview_id
FROM interviews 
JOIN interviewers ON interviewers.id = interviews.interviewers_id 
JOIN students ON students.id = interviews.students_id
WHERE students.id = $1`;

// checks to see if answer is correct

// post an interview
export const postInterview = `INSERT INTO interviews(students_id, interviewers_id, interview_date)
VALUES($1, $2, $3) RETURNING *`;
/**
 * Queries For Logging In and Out
 */
export const emailCheck = `SELECT email FROM interviewers`;
export const login = `SELECT * FROM interviewers WHERE email = $1`;
