import { z } from 'zod'

export const loginSchemaTeacher = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const loginSchemaStudent = z.object({
  name: z.string().min(3),
  matricula: z.string().min(6),
});

export const loginSchemaMajor = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
