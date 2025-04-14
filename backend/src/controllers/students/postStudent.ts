import { Context } from "hono";
import { registerSchemaStudent } from "../../schemas/registerSchema";
import Student from "../../types/studentType";
import { PrismaClient } from '@prisma/client';
import createLog from "../../utils/log";

const prisma = new PrismaClient();

// Helper function to convert DD/MM/YYYY to ISO date format with time
function convertToISODate(dateString: string): string {
    if (!dateString) return '';
    
    // Parse the date parts
    const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
    
    // Validate month and day ranges before creating Date object
    if (month < 1 || month > 12) {
        throw new Error(`Mês inválido: ${month}. Deve estar entre 1 e 12.`);
    }
    
    // Check days in month
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        throw new Error(`Dia inválido: ${day}. ${getMonthName(month)} tem ${daysInMonth} dias.`);
    }
    
    // Create a new Date object (note: month is 0-indexed in JavaScript Date)
    const date = new Date(year, month - 1, day);
    
    // Return the full ISO string (with time component)
    return date.toISOString();
}

// Helper function to get month name in Portuguese
function getMonthName(month: number): string {
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return monthNames[month - 1];
}

export const postStudent = async (c: Context) => {
    try {
        const body = await c.req.json();

        if (!body) return c.text("Error, no data provided", 400);
    
        const data = registerSchemaStudent.safeParse(body);
    
        if (!data.success) return c.json({ 
            success: false, 
            message: 'Dados inválidos', 
            errors: data.error.errors 
        }, 400);
        
        const { name, email, phone, birthday, gender, parent1, parent2 } = data.data;

        // Convert birthday to ISO format
        let formattedBirthday;
        try {
            formattedBirthday = birthday ? convertToISODate(birthday) : null;
        } catch (error) {
            return c.json({ 
                success: false, 
                message: error instanceof Error ? error.message : 'Data de aniversário inválida'
            }, 400);
        }

        const ifExist = await prisma.students.findMany({
            where: {
                nome: name,
                email: email
            }
        });
    
        if (ifExist.length > 0) {
            await createLog({
                title: "Tentativa de cadastrar um estudante já cadastrado",
                description: `Estudante: ${name} já existe`,
                userid: ifExist[0].id,
                table: 'students',
            })

            return c.json({ 
                success: false, 
                message: 'Estudante já cadastrado' 
            }, 400);
        }
        
        const currentYear = new Date().getFullYear();
        
        // First create the student without matricula
        const student = await prisma.students.create({
            data: {
                email,
                nome: name,
                telefone: phone,
                aniversario: formattedBirthday || '',
                genero: gender,
                responsavel1: parent1,
                responsavel2: parent2,
                // Temporarily set a placeholder matricula
                matricula: 'temporary'
            }
        });

        const updatedStudent = await prisma.students.update({
            where: { id: student.id },
            data: {
                matricula: `${currentYear}-1-${student.id}`
            }
        });

        await createLog({
            title: "Estudante cadastrado com sucesso",
            description: `Estudante: ${name} cadastrado com sucesso`,
            userid: student.id,
            table: 'students',
        })
    
        return c.json({ 
            success: true, 
            message: 'Estudante cadastrado com sucesso', 
            student: updatedStudent 
        });
    } catch (error) {
        console.error('Error registering student:', error);
        return c.json({ 
            success: false,
            message: "Um erro ocorreu ao cadastrar o estudante",
            error: error instanceof Error ? error.message : String(error)
        }, 500);
    }
}
