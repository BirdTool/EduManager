import { Hono } from "hono";
import { getStudents } from "../controllers/students/getStudents";
import { postStudent } from "../controllers/students/postStudent";
import { putStudent } from "../controllers/students/putStudent";
import { deleteStudent } from "../controllers/students/deleteStudent";
import { getStudentsRecord } from "../controllers/students/records/getStudentsRecord";
import { postStudentRecord } from "../controllers/students/records/postStudentRecord";

const student = new Hono();

student.get('/students', getStudents);
student.get('/students/:id', getStudents);
student.post('/students', postStudent);
student.put('/students/:id', putStudent);
student.delete('/students/:id', deleteStudent);

// warnings / occurrences / suspensions

student.get('/students/:type/:id', getStudentsRecord);

student.post('/students/:type/:id', postStudentRecord); // advertencias, ocorrencias ou suspensões

export default student;