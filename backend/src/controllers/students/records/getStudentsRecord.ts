import { Context } from 'hono'
import pool from '../../../services/db'

export const getStudentsRecord = async (c: Context) => {
    const studentId = c.req.param('id');
    const type = c.req.param('type');

    try {
        switch(type) {
            case "warnings": {
                const warnings = await pool.query(`SELECT * FROM records WHERE studentid = $1 AND tipo = $2`, [studentId, "advertencia"]);
            
                if (!warnings || warnings.rowCount === 0) return c.json({ message: "Error, this student does not existing or do not have acidents" }, 404)
            
                return c.json(warnings.rows)
            }
            case "occurences": {
                const occurences = await pool.query(`SELECT * FROM records WHERE studentid = $1 AND tipo = $2`, [studentId, "ocorrencia"]);
    
                if (!occurences || occurences.rowCount === 0) return c.json({ message: "Error, this student does not existing or do not have acidents" }, 404)
    
                return c.json(occurences.rows)
            }
            case "suspensions": {
                const suspensions = await pool.query(`SELECT * FROM records WHERE studentid = $1 AND tipo = $2`, [studentId, "suspensao"]);
    
                if (!suspensions || suspensions.rowCount === 0) return c.json({ message: "Error, this student does not existing or do not have acidents" }, 404)
               
                return c.json(suspensions.rows)
            }
            case "all": {
                const records = await pool.query(`SELECT * FROM records WHERE studentid = $1`, [studentId]);
    
                if (!records || records.rowCount === 0) return c.json({ message: "Error, this student does not existing or do not have acidents" }, 404)
               
                return c.json(records.rows)
            }
            default: {
                return c.json({ message: "this type does not existing" }, 404)
            }
        }
    } catch (error) {
        console.error('Error fetching student records:', error);
        return c.json({ message: "Error fetching student records" }, 500);
    }
}