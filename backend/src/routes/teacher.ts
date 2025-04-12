import { Hono } from "hono";
import { getTeachers } from "../controllers/teachers/getTeachers";
import { postTeacher } from "../controllers/teachers/postTeacher";
import { putTeacher } from "../controllers/teachers/putTeacher";
import { deleteTeacher } from "../controllers/teachers/deleteTeacher";

const teacher = new Hono();

teacher.get('/teachers', getTeachers);
teacher.get('/teachers/:id', getTeachers);

teacher.post('/teacher', postTeacher);
teacher.put('/teacher/:id', putTeacher);
teacher.delete('/teacher/:id', deleteTeacher);

export default teacher;