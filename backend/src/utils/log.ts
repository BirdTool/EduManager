import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type LogLevel = 'info' | 'warn' | 'error';

interface LogData {
    title: string;
    description: string;
    userid?: number;
    table?: string;
    level?: LogLevel;
}

export default async function createLog({ title, description, userid, table, level = 'info' }: LogData) {
    try {
        await prisma.logs.create({
            data: {
                title,
                description,
                userid,
                table,
                level
            }
        })
    } catch (error) {
        console.error(error)
        throw new Error('A error ocurred to create a log');
    }
}