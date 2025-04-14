import { Hono } from "hono";
import { getLeassons } from "../../controllers/classroom//leassons/getLeassons";
import { postLeasson } from "../../controllers/classroom/leassons/postLeasson";
import { putLeasson } from "../../controllers/classroom/leassons/putLeasson";
import { deleteLeasson } from "../../controllers/classroom/leassons/deleteLeasson";
import { getNextLeassons } from "../../controllers/classroom/leassons/getNextLeasson";

const leassons = new Hono();

leassons.get('/leassons', getLeassons);
leassons.get('/leassons/leassonid/:leassonid', getLeassons);
leassons.get('/leassons/classroomid/:classroomid', getLeassons);
leassons.get('/leassons/next/:classroomid', getNextLeassons);
                            // classroomid
leassons.post('/leassons/:classroomid', postLeasson);
leassons.put('/leassons/:lessonid', putLeasson);
leassons.delete('/leassons/:leassonid', deleteLeasson);

export default leassons;