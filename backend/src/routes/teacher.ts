import { Hono } from "hono";
import { getTeachers } from "../controllers/teachers/getTeachers";

const teacher = new Hono();

teacher.get('/teachers', getTeachers);
teacher.get('/teachers/:id', getTeachers);

teacher.post('/teacher');
teacher.put('/teacher/:id');
teacher.delete('/teacher/:id');

export default teacher;