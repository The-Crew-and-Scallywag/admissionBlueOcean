-- INSERT INTO students(first_name, last_name, email, phone)
-- VALUES('Ronnie', 'Miller', 'Ronnie@gg.com', '12345567890'),
-- ('Bonnie', 'Miller', 'Bonnie@gg.com', '12345567890'),
-- ('Monnie', 'Miller', 'Monnie@gg.com', '12344567890'),
-- ('Zonnie', 'Miller', 'Zonnie@gg.com', '12334567890'),
-- ('Fitz', 'Sicat', 'Fitz@email.com', '13345667890');




INSERT INTO interviewers(students_id, first_name, last_name, email, password)
VALUES(23, 'Samson', 'Brown', 'samson@rr.com', 'password'),
(19, 'Ronnie', 'Miller', 'ronnie@gg.com', 'password'),
(1, 'William', 'Swinson', 'will@ar15.com', 'password'),
(2, 'Joseph', 'Carmeli', 'joseph@papi.com', 'password'),
(3, 'Fitzgerald', 'Sicat', 'fitz@gpt.com', 'password'),
(5, 'Danny', 'Andrews', 'danny@email.com', 'password');

-- INSERT INTO interviews(students_id, interviewers_id, interview_date, notes, results)
-- VALUES(3,1, '2023-07-07T05:00:00.000Z', 'Very Stupid and Smell Very funny', FALSE),
-- (2,1, '2023-07-01T06:00:00.000Z', 'Stupid and Smell funny', FALSE),
-- (1,1, '2023-07-12T09:00:00.000Z', 'Smart and Smells good', TRUE),
-- (5,1, '2023-07-12T09:00:00.000Z', 'My boy was on CHATGPT', TRUE),
-- (4,1, '2023-07-06T11:00:00.000Z', 'He''s Actually huge', TRUE);

INSERT INTO questions(questions)
VALUES('Paste in their solution to one of the codeing chalenges and have them explain it.'),
('How would you be able to access and use the methods in the swissArmyKnife object below? 
var swissArmyKnife = {
    miniScissors: function(item) {
        return ''cutting '' + item;
    },
    toothpick : function() {
        return ''clink clink'';
    },
    twezzers: function() {
        return ''pluck pluck''
    }
}'),
('Create a new variable called radio and set it equal to a empty object. Now add a method that a radio might have (e.g. play).'),
('How would we call this method?');