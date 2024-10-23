
import { StudentsCollection } from "../db/models/students";

export const GetAllStudents = async()=>{
    const students = await StudentsCollection.find();
    return students;
};

export const GetStudentsId = async(studentId)=>{
    const student = StudentsCollection.findById(studentId);
    return student; 
};