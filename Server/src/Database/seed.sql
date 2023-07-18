\COPY STUDENTS (FIRST_NAME, LAST_NAME, EMAIL, PHONE) FROM SRC/SCRIPTS/STUDENT.CSV WITH (FORMAT CSV, DELIMITER ',');

INSERT INTO INTERVIEWERS (
    STUDENTS_ID,
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PASSWORD
) VALUES (
    23,
    'Samson',
    'Brown',
    'samson@rr.com',
    'password'
),
(
    19,
    'Ronnie',
    'Miller',
    'ronnie@gg.com',
    'password'
),
(
    1,
    'William',
    'Swinson',
    'will@ar15.com',
    'password'
),
(
    2,
    'Joseph',
    'Carmeli',
    'joseph@papi.com',
    'password'
),
(
    3,
    'Fitzgerald',
    'Sicat',
    'fitz@gpt.com',
    'password'
),
(
    5,
    'Danny',
    'Andrews',
    'danny@email.com',
    'password'
);

\COPY INTERVIEWS (STUDENTS_ID, INTERVIEWERS_ID, INTERVIEW_DATE, QUESTION_NOTES, NOTES, RESULTS) FROM SRC/SCRIPTS/INTERVIEW.CSV WITH (FORMAT CSV, DELIMITER ',');

INSERT INTO QUESTIONS (
    QUESTIONS
) VALUES (
    'Paste in their solution to one of the codeing chalenges and have them explain it.'
),
(
    'How would you be able to access and use the methods in the swissArmyKnife object below? 
    var swissArmyKnife = {
        miniScissors: function(item) {
            return ''cutting '' + item;

},

TOOTHPICK: FUNCTION() {

RETURN ''CLINK CLINK'';

},

TWEZZERS: FUNCTION() {

RETURN ''PLUCK PLUCK'';

}

}'),

('Create a new variable called radio and set it equal to an empty object. Now add a method that a radio might have (e.g., play).'),
('How would we call this method?');