import { db } from "../Database/database.js"
import { allStudents, postResult } from "./queries.js"

// fetches all students
export const getAllStudents = async (req, res)=>{
    try {
        const results = await db.query(allStudents)
        console.log(results.rows[0].prev_attempt)
        res.status(200).json(results.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "ERROR Fetching Students"})
    }
}

// post interview results to db
export const postStudentResults = async(req, res)=>{
    try {
        let {status} = req.body
        const id = req.params.id
        console.log(status)
        if (status.toLowerCase() == "true"){
            status = true
        } else if(status.toLowerCase() == "false"){
            status = false
        } else {
             return res.status(400).json({message:"Result should be a boolean value"})
        }

        const results = db.query(postResult, [status, id])

        res.status(200).json(results.rows)

    } catch (error) {
        console.error(error)
        res.status(500).json({message: "ERROR Posting Result"})
    }
}

// get interviewers notes from a specific interview
