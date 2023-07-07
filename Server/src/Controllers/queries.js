/**
 * Queries For The Interviewer
 */
// get all student
export const allStudents = `SELECT * FROM students`;
// get student by id
export const student = `SELECT * FROM students WHERE id = $1`;
// get all interviewers
// export const
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
export const login = `SELECT id, email, password FROM interviewers WHERE email = $1`;
