import { Hono } from "hono";
import { searchStudentByName } from "../controllers/search/searchStudentByName";
import { searchStudentByAllInfos } from "../controllers/search/searchStudent";
import { searchTeacherByName } from "../controllers/search/searchTeacherByName";
import { searchTeacherByAllInfos } from "../controllers/search/searchTeacher";
import { searchManagementByName } from "../controllers/search/searchManagementByName";
import { searchManagementByAllInfos } from "../controllers/search/searchManagement";
import { searchAll } from "../controllers/search/searchAll";
import { searchRecordsByStudentName } from "../controllers/records/search/recordsByStudent";
import { searchRecordsByResponsibleName } from "../controllers/records/search/recordsByResponsible";
import { searchLeassons } from "../controllers/search/searchLeassons";

const search = new Hono();

search.get('/student/name', searchStudentByName);
search.get('/student/all', searchStudentByAllInfos);

search.get('/teacher/name', searchTeacherByName);
search.get('/teacher/all', searchTeacherByAllInfos);

search.get('/management/name', searchManagementByName);
search.get('/management/all', searchManagementByAllInfos);

search.get('/leassons', searchLeassons);
search.get('/leassons/:classroomid', searchLeassons);

search.get('/all', searchAll);

search.get('records/student', searchRecordsByStudentName);
search.get('records/responsible', searchRecordsByResponsibleName)

export default search;