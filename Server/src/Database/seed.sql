INSERT INTO interviewers (first_name, last_name, email, password)
VALUES
    ('Samson', 'Brown', 'samson@rr.com', 'password'),
    ('Ronnie', 'Miller', 'ronnie@gg.com', 'password'),
    ('William', 'Swinson', 'will@ar15.com', 'password'),
    ('Joseph', 'Carmeli', 'joseph@papi.com', 'password'),
    ('Fitzgerald', 'Sicat', 'fitz@gpt.com', 'password'),
    ('Danny', 'Andrews', 'danny@email.com', 'password');

\COPY students (interviewers_id, first_name, last_name, email, phone) FROM /docker-entrypoint-initdb.d/student.csv WITH (FORMAT csv, DELIMITER ',');

\COPY interviews (students_id, interviewers_id, interview_date, question_notes, notes, results) FROM /docker-entrypoint-initdb.d/interview.csv WITH (FORMAT csv, DELIMITER ',');

INSERT INTO questions (questions)
VALUES
    ('Have student paste in their solution to one of the coding challenges and have them explain the code.'),
    ('How would you be able to access and use the methods in the swissArmyKnife object below?
    var swissArmyKnife = {
        miniScissors: function(item) {
            return ''cutting '' + item;
        },
        toothpick: function() {
            return ''clink clink'';
        },
        twezzers: function() {
            return ''pluck pluck'';
        }
    }'),
    ('Create a new variable called radio and set it equal to an empty object. Now add a method that a radio might have (e.g., play).'),
    ('How would we call this method?');