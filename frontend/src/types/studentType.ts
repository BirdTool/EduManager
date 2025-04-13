export interface Student {
    id: number;
    nome: string;
    matricula?: string;
    aniversario: string; // ISO format (DateTime)
    email: string;
    genero: string;
    telefone: string;
    notas: any[]; // ou um tipo mais específico se você souber a estrutura dos itens
  
    responsavel1: string;
    responsavel2?: string;
  
    classroomId?: number;
    classroom?: Classroom;
  
    records: Record[];
    absences: Absence[];
  }
  
  interface Record {
    id: number;
    responsavel: string;
    motivo: string;
    tipo: string;
    data: string; // ISO format
    dias?: number;
  
    studentid: number;
    student?: Student;
  }
  
  interface Absence {
    id: number;
    lessonId: number;
    studentId: number;
  
    lesson?: Lesson;
    student?: Student;
  }
  
  interface Classroom {
    id: number;
    // Outros campos relevantes para a sala de aula
  }
  
  interface Lesson {
    id: number;
    // Outros campos relevantes para a aula
  }
  