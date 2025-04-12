import { Hono } from "hono";
import { getStudents } from "../../controllers/students/getStudents";
import { getClassroom } from "../../controllers/classroom/getClassroom";
import { postStudent } from "../../controllers/classroom/students/postStudent";
import { deleteStudents } from "../../controllers/classroom/students/deleteStudents";

const classrooms = new Hono();

// ver as salas de aulas
classrooms.get('/classrooms', getClassroom);
classrooms.get('/classrooms/:id', getClassroom);

// gerenciar alunos da sala

classrooms.get('/classrooms/:id/students', getStudents);
classrooms.post('/classrooms/:id/:studentid', postStudent);
classrooms.delete('/classrooms/:id/:studentid', deleteStudents);

export default classrooms;