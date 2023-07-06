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
export const postResult = `UPDATE students SET prev_attempt = ARRAY_APPEND(prev_attempt, $1) WHERE id = $2 RETURNING prev_attempt`;
// adds attempts to the databaseh
// get attempt
export const interviewerNotes = `SELECT notes.note FROM notes JOIN interviewers ON notes.interviewers_id = interviewers.id WHERE interviewers.id = $1`;
// get notes from interviews
export const notes = `
SELECT notes.note FROM notes
JOIN interviewers ON notes.interviewers_id = interviewers.id
JOIN attempts.attempt_count ON notes.student_attempts = attempt.attempt_count
WHERE interviewers.id = $1`;

/**
 * Queries For Logging In and Out
 */
export const login = `SELECT email, password FROM interviewers WHERE email = $1`;
