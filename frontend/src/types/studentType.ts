export default interface Student {
    id: number;
    name: string;
    matricula: string | null;
    age: number;
    nascimento: string;
    notas: Notas[];
    advertencias: Advertencia[];
    ocorrencias: Ocorrencia[];
    suspensoes: Suspensao[];
}

interface Notas {
    matéria: string;
    bimestre: 1 | 2 | 3 | 4;
    nota: number;
}

interface Advertencia {
    data: string;
    motivo: string;
}

interface Ocorrencia {
    data: string;
    motivo: string;
}

interface Suspensao {
    data: string;
    motivo: string;
    dias: number;
}