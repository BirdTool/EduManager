import { z } from 'zod'

export const loginSchemaTeacher = z.object({
  email: z.string().email("O email deve ser um endereço de email válido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 digitos")
});

export const loginSchemaStudent = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  matricula: z.string().min(8, "A matrícula deve ter pelo menos 8 caracteres")
});

export const loginSchemaManagament = z.object({
  email: z.string().email("O email deve ser um endereço de email válido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 digitos"),
});
