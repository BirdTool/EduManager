export default interface Student {
    id: number;
    nome: string;
    genero: 'masculino' | 'feminino';
    matricula: string | null;
    aniversario: string;
    notas: Notas[];
    advertencias: string[];
    ocorrencias: string[];
    suspensoes: string[];
    responsavel1: string;
    responsavel2: string;
    email: string;
    telefone: string;
    classe: string;
}

interface Notas {
    matéria: string;
    bimestre: 1 | 2 | 3 | 4;
    nota: number;
}