import { z } from 'zod'

export const registerSchemaTeacher = z.object({
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  password: z.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .regex(/^(?=.*[A-Z])(?=.*[0-9])/, 'Senha deve conter pelo menos uma letra maiúscula e um número'),
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  gender: z.enum(['masculino', 'feminino'], {
    errorMap: () => ({ message: 'Gênero deve ser masculino ou feminino' })
  }),
  phone: z.string()
    .min(10, 'Telefone deve ter no mínimo 10 dígitos')
    .regex(/^\d+$/, 'Telefone deve conter apenas números'),
  matery: z.string()
    .min(1, 'Matéria é obrigatória'),
  birthday: z.string()
    .datetime('Data de nascimento inválida'),
});

export const registerSchemaStudent = z.object({
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  phone: z.string()
    .min(10, 'Telefone deve ter no mínimo 10 dígitos')
    .regex(/^\d+$/, 'Telefone deve conter apenas números'),
  gender: z.enum(['masculino', 'feminino'], {
    errorMap: () => ({ message: 'Gênero deve ser masculino ou feminino' })
  }),
  birthday: z.string()
});

export const registerSchemaMajor = z.object({
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  password: z.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .regex(/^(?=.*[A-Z])(?=.*[0-9])/, 'Senha deve conter pelo menos uma letra maiúscula e um número'),
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  gender: z.enum(['masculino', 'feminino'], {
    errorMap: () => ({ message: 'Gênero deve ser masculino ou feminino' })
  }),
  phone: z.string()
    .min(10, 'Telefone deve ter no mínimo 10 dígitos')
    .regex(/^\d+$/, 'Telefone deve conter apenas números'),
  role: z.string()
    .min(1, 'Cargo é obrigatório'),
  birthday: z.string()
    .datetime('Data de nascimento inválida'),
});
