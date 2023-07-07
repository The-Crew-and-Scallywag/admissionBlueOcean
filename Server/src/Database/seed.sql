INSERT INTO students(first_name, last_name, email, phone, results, notes, interview_date, interview_time)
VALUES('Ronnie', 'Miller', 'Ronnie@gg.com', 1234567890, ARRAY[TRUE], ARRAY['HE''s HUGE'], '2023-07-6', '19:10:25-07');
-- ('Mathew', 'Guy', 'Mathew@yes.com', ARRAY[FALSE, FALSE, FALSE, TRUE], ARRAY[1,2,3,4]),
-- ('La Shonta', 'Gal', 'lshonta@email.com', ARRAY[FALSE, FALSE, FALSE, TRUE], ARRAY[1,2,3,4]),
-- ('Triston', 'Scallywag', 'Triston@Scallywag.com', ARRAY[FALSE, FALSE, FALSE, TRUE], ARRAY[1,2,3,4]);

INSERT INTO interviewers(students_id, first_name, last_name, email, password)
VALUES(1, 'Samson', 'Brown', 'samson@rr.com', 'password');
