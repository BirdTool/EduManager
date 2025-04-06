import { Hono } from "hono";
import { getRecordsById } from "../controllers/records/gets/getRecordsById";
import { getRecordsByResponsible } from "../controllers/records/gets/getRecordsByResponsible";
import { getRecords } from "../controllers/records/gets/getAllRecords";
import { searchRecordsByResponsibleName } from "../controllers/records/search/recordsByResponsible";
import { searchRecordsByStudentName } from "../controllers/records/search/recordsByStudent";

const record = new Hono();

record.get('/records', getRecords)
record.get('/records/id/:id', getRecordsById);
record.get('/records/responsible/:responsible', getRecordsByResponsible);
record.get('/records/search/responsible', searchRecordsByResponsibleName);
record.get('/records/search/student', searchRecordsByStudentName);

export default record;