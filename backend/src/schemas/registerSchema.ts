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
    .min(8, 'Telefone deve ter no mínimo 8 dígitos')
    .regex(/^\d+$/, 'Telefone deve conter apenas números'),
  matery: z.array(z.string().min(1, 'Disciplina deve ter no mínimo 1 caractere')),
  birthday: z.string()
});

export const registerSchemaStudent = z.object({
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  phone: z.string()
    .min(8, 'Telefone deve ter no mínimo 8 dígitos')
    .regex(/^\d+$/, 'Telefone deve conter apenas números'),
  gender: z.enum(['masculino', 'feminino'], {
    errorMap: () => ({ message: 'Gênero deve ser masculino ou feminino' })
  }),
  birthday: z.string().regex(/^\d{1,2}\/\d{1,2}\/\d{4}$/, {
    message: "Data deve estar no formato DD/MM/AAAA"
  }),
  parent1: z.string().max(100, 'O nome tem muitos caracteres!'),
  parent2: z.string().max(100, 'O nome tem muitos caracteres!').optional()
});

export const registerSchemaManagement = z.object({
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
    .min(8, 'Telefone deve ter no mínimo 8 dígitos')
    .regex(/^\d+$/, 'Telefone deve conter apenas números'),
  role: z.string()
    .min(1, 'Cargo é obrigatório'),
  birthday: z.string()
});
