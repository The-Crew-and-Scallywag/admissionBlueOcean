// get all student
export const allStudents = `SELECT * FROM students`
// get student by id
export const student = `SELECT * FROM student WHERE id = $1`
// post attempt
export const postResult = `UPDATE students SET prev_attempt = ARRAY_APPEND(prev_attempt, $1) WHERE id = $2 RETURNING prev_attempt`
// get attempt
export const interviewerNotes = `SELECT students.prev_attempt FROM students JOIN notes ON students.id = notes.students_id WHERE id = $1`
// post pass of fail status
// 