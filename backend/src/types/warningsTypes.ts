export interface RegistroDisciplinar {
    id: number;
    studentId: number;
    responsavel: string;
    tipo: 'advertencia' | 'ocorrencia' | 'suspensao';
    data: string;
    motivo: string;
    dias?: number; // só usado em suspensões
  }
  