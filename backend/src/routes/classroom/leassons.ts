import { Hono } from "hono";
import { getLeassons } from "../../controllers/classroom//leassons/getLeassons";
import { postLeasson } from "../../controllers/classroom/leassons/postLeasson";
import { putLeasson } from "../../controllers/classroom/leassons/putLeasson";
import { deleteLeasson } from "../../controllers/classroom/leassons/deleteLeasson";

const leassons = new Hono();

leassons.get('/leassons', getLeassons);
leassons.get('/leassons/:leassonid', getLeassons);
leassons.get('leassons/:classroomid', getLeassons)

leassons.post('/leassons/:classroomid', postLeasson);
leassons.put('/leassons/:lessonid', putLeasson);
leassons.delete('/leassons/:leassonid', deleteLeasson);

export default leassons;