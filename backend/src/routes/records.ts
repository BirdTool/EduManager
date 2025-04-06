import { Hono } from "hono";
import { getRecordsById } from "../controllers/records/gets/getRecordsById";
import { getRecordsByResponsible } from "../controllers/records/gets/getRecordsByResponsible";
import { getRecords } from "../controllers/records/gets/getAllRecords";

const record = new Hono();

record.get('/records', getRecords)
record.get('/records/id/:id', getRecordsById);
record.get('/records/responsible/:responsible', getRecordsByResponsible);

export default record;