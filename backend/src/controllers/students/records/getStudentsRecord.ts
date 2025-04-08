import { Context } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getStudentsRecord = async (c: Context) => {
    const studentId = c.req.param('id');
    const type = c.req.param('type');

    try {
        switch(type) {
            case "warnings": {
                const warnings = await prisma.records.findMany({
                    where: {
                        studentid: Number(studentId),
                        tipo: "advertencia"
                    },
                });
            
                if (!warnings || warnings.length === 0) return c.json({ message: "Error, this student does not existing or do not have acidents" }, 404)
            
                return c.json(warnings)
            }
            case "occurences": {
                const occurences = await prisma.records.findMany({
                    where: {
                        studentid: Number(studentId),
                        tipo: "ocorrencia"
                    }
                });
    
                if (!occurences || occurences.length === 0) return c.json({ message: "Error, this student does not existing or do not have acidents" }, 404)
    
                return c.json(occurences)
            }
            case "suspensions": {
                const suspensions = await prisma.records.findMany({
                    where: {
                        studentid: Number(studentId),
                        tipo: "suspensao"
                    }
                });
    
                if (!suspensions || suspensions.length === 0) return c.json({ message: "Error, this student does not existing or do not have acidents" }, 404)
               
                return c.json(suspensions)
            }
            case "all": {
                const records = await prisma.records.findMany({
                    where: {
                        studentid: Number(studentId)
                    }
                });
    
                if (!records || records.length === 0) return c.json({ message: "Error, this student does not existing or do not have acidents" }, 404)
               
                return c.json(records)
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
