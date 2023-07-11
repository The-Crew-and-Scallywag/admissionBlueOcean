/**
 * Queries For The Interviewer
 */
// get all student
export const allStudents = `SELECT * FROM students`;
// get student by id
export const student = `SELECT * FROM students WHERE id = $1`;
// get all interviewers
export const allInterviews = `
SELECT interviewers.first_name AS i_first_name, interviewers.last_name AS i_last_name, interviewers.email AS i_email,
students.first_name AS s_first_name, students.last_name AS s_last_name,
interviews.notes AS notes, interviews.results AS results, interviews.interview_date
FROM interviews 
JOIN interviewers ON interviewers.id = interviews.interviewers_id 
JOIN students ON students.id = interviews.students_id`;
export const interview = `
SELECT interviewers.first_name AS i_first_name, interviewers.last_name AS i_last_name, interviewers.email AS i_email,
students.first_name AS s_first_name, students.last_name AS s_last_name,
interviews.notes AS notes, interviews.results AS results, interviews.interview_date
FROM interviews 
JOIN interviewers ON interviewers.id = interviews.interviewers_id 
JOIN students ON students.id = interviews.students_id
WHERE students.id = $1`;
// post attempt
export const postResult = `UPDATE students set notes= ARRAY_APPEND(notes,$1 ), results = ARRAY_APPEND(results, $2 ) WHERE id = $3`;
// adds attempts to the databaseh
// get attempt
export const interviewerNotes = `SELECT students.notes FROM students JOIN interviewers ON students.id = interviewers.students_id WHERE interviewers.id = $1`;
// get notes from interviews
export const postResults = `UPDATE students set notes= ARRAY_APPEND($1, notes) AND set results = ARRAY_APPEND($2, results)`;
/**
 * Queries For Logging In and Out
 */
export const emailCheck = `SELECT email FROM interviewers`;
export const login = `SELECT * FROM interviewers WHERE email = $1`;
