import { Hono } from "hono";
import { searchStudentByName } from "../controllers/search/searchStudentByName";
import { searchStudentByAllInfos } from "../controllers/search/searchStudent";
import { searchTeacherByName } from "../controllers/search/searchTeacherByName";
import { searchTeacherByAllInfos } from "../controllers/search/searchTeacher";
import { searchManagementByName } from "../controllers/search/searchManagementByName";
import { searchManagementByAllInfos } from "../controllers/search/searchManagement";
import { searchAll } from "../controllers/search/searchAll";

const search = new Hono();

search.get('/student/name', searchStudentByName);
search.get('/student/all', searchStudentByAllInfos);

search.get('/teacher/name', searchTeacherByName);
search.get('/teacher/all', searchTeacherByAllInfos);

search.get('/management/name', searchManagementByName);
search.get('/management/all', searchManagementByAllInfos);

search.get('/all', searchAll);

export default search;