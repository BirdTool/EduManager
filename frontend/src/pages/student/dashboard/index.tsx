import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  StudentHeader,
  StudentName,
  StudentInfo,
  GridContainer,
  Card,
  CardTitle,
  ClassList,
  ClassItem,
  ClassSubject,
  ClassInfo,
  RecordSection,
  RecordTitle,
  RecordList,
  RecordItem,
  RecordDescription,
  RecordDate,
  EmptyMessage,
  ErrorMessage,
  LoadingMessage
} from './styles';

interface Class {
  id: number;
  nome: string;
  date: string;
  time: string;
  subject: string;
  teacher: string;
}

interface Record {
  id: number;
  tipo: string;
  motivo: string;
  data: string;
  studentid: number;
  dias?: number;
}

export default function StudentDashboard() {
  const [aluno, setAluno] = useState<any>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [records, setRecords] = useState<Record[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get student information
        const studentResponse = await axios.get('http://localhost:3000/protected/student/me', {
          headers: {
            'x-api-key': import.meta.env.VITE_TOKEN
          }
        });

        if (studentResponse.data.success) {
          const studentData = studentResponse.data.data;
          setAluno(studentData);

          // Get upcoming classes
          const classesResponse = await axios.get(`http://localhost:3000/api/classrooms/${studentData.classroomid}`, {
            headers: {
              'x-api-key': import.meta.env.VITE_TOKEN
            }
          });
          setClasses(classesResponse.data);
          console.log("classe:", classesResponse)

          // Get all student records
          const recordsResponse = await axios.get(`http://localhost:3000/api/students/allrecords/${studentData.id}`, {
            headers: {
              'x-api-key': import.meta.env.VITE_TOKEN
            }
          });
          setRecords(recordsResponse.data);
        } else {
          setErro("Acesso negado");
        }
      } catch (error) {
        console.error(error);
        setErro("Erro ao buscar dados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (erro) return <ErrorMessage>{erro}</ErrorMessage>;
  if (loading) return <LoadingMessage>Carregando...</LoadingMessage>;

  // Filter records by type
  const warnings = records.filter(record => record.tipo === "advertencia");
  const occurrences = records.filter(record => record.tipo === "ocorrencia");
  const suspensions = records.filter(record => record.tipo === "suspensao");

  const classroom = classes.find((classroom) => classroom.id === aluno.classroomId);

  return (
    <Container>
      {/* Student Header */}
      <StudentHeader>
        <StudentName>Olá, {aluno.nome}</StudentName>
        <StudentInfo>Matrícula: {aluno.matricula}</StudentInfo>
        <StudentInfo>Turma: {classroom?.nome || "não encontrado"}</StudentInfo>
      </StudentHeader>

      <GridContainer>
        {/* Upcoming Classes */}
        <Card>
          <CardTitle>Próximas Aulas</CardTitle>
          {classes.length > 0 ? (
            <ClassList>
              {classes.map((aula) => (
                <ClassItem key={aula.id}>
                  <ClassSubject>{aula.subject}</ClassSubject>
                  <ClassInfo>Professor: {aula.teacher}</ClassInfo>
                  <ClassInfo>Data: {new Date(aula.date).toLocaleDateString('pt-BR')}</ClassInfo>
                  <ClassInfo>Horário: {aula.time}</ClassInfo>
                </ClassItem>
              ))}
            </ClassList>
          ) : (
            <EmptyMessage>Nenhuma aula programada.</EmptyMessage>
          )}
        </Card>

        {/* Student Records */}
        <Card>
          <CardTitle>Registros Disciplinares</CardTitle>
          
          {/* Warnings */}
          <RecordSection>
            <RecordTitle type="warning">Advertências ({warnings.length})</RecordTitle>
            {warnings.length > 0 ? (
              <RecordList>
                {warnings.map((warning) => (
                  <RecordItem key={warning.id} type="warning">
                    <RecordDescription>{warning.motivo}</RecordDescription>
                    <RecordDate>Data: {new Date(warning.data).toLocaleDateString('pt-BR')}</RecordDate>
                  </RecordItem>
                ))}
              </RecordList>
            ) : (
              <EmptyMessage>Nenhuma advertência registrada.</EmptyMessage>
            )}
          </RecordSection>
          
          {/* Occurrences */}
          <RecordSection>
            <RecordTitle type="occurrence">Ocorrências ({occurrences.length})</RecordTitle>
            {occurrences.length > 0 ? (
              <RecordList>
                {occurrences.map((occurrence) => (
                  <RecordItem key={occurrence.id} type="occurrence">
                    <RecordDescription>{occurrence.motivo}</RecordDescription>
                    <RecordDate>Data: {new Date(occurrence.data).toLocaleDateString('pt-BR')}</RecordDate>
                  </RecordItem>
                ))}
              </RecordList>
            ) : (
              <EmptyMessage>Nenhuma ocorrência registrada.</EmptyMessage>
            )}
          </RecordSection>
          
          {/* Suspensions */}
          <RecordSection>
            <RecordTitle type="suspension">Suspensões ({suspensions.length})</RecordTitle>
            {suspensions.length > 0 ? (
              <RecordList>
                {suspensions.map((suspension) => (
                  <RecordItem key={suspension.id} type="suspension">
                    <RecordDescription>{suspension.motivo}</RecordDescription>
                    <RecordDate>Data: {new Date(suspension.data).toLocaleDateString('pt-BR')}</RecordDate>
                    <p>dias</p>
                  </RecordItem>
                ))}
              </RecordList>
            ) : (
              <EmptyMessage>Nenhuma suspensão registrada.</EmptyMessage>
            )}
          </RecordSection>
        </Card>
      </GridContainer>
    </Container>
  );
}
