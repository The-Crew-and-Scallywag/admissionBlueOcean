INSERT INTO students(first_name, last_name, email, phone, results, notes, interview_date)
VALUES('Ronnie', 'Miller', 'Ronnie@gg.com', 1234567890, ARRAY[TRUE], ARRAY['HE''s HUGE'], '2023-07-6 05:00:00');
-- ('Mathew', 'Guy', 'Mathew@yes.com', ARRAY[FALSE, FALSE, FALSE, TRUE], ARRAY[1,2,3,4]),
-- ('La Shonta', 'Gal', 'lshonta@email.com', ARRAY[FALSE, FALSE, FALSE, TRUE], ARRAY[1,2,3,4]),
-- ('Triston', 'Scallywag', 'Triston@Scallywag.com', ARRAY[FALSE, FALSE, FALSE, TRUE], ARRAY[1,2,3,4]);

INSERT INTO interviewers(students_id, first_name, last_name, email, password)
VALUES(1, 'Samson', 'Brown', 'samson@rr.com', 'password');

INSERT INTO questions(questions)
VALUES("Paste in their solution to one of the codeing chalenges and have them explain it.")

INSERT INTO questions(questions)
VALUES("How would you be able to access and use the methods in the swissArmyKnife object below? 
var swissArmyKnife = {
    miniScissors: function(item) {
        return 'cutting ' + item;
    },
    toothpick : function() {
        return 'clink clink';
    },
    twezzers: function() {
        return 'pluck pluck'
    }
}
    
    //CODE HERE")

INSERT INTO questions(questions)
VALUES("Create a new variable called radio and set it equal to a empty object. Now add a method that a radio might have (e.g. play).")

INSERT INTO questions(questions)
VALUES("How would we call this method?")