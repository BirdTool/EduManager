import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import StudentHeader from "../../../components/header/studentHeader"
import * as s from "./styles"
import axios from "axios"
import { Student } from "../../../types/studentType"

interface Records {
    id: number;
    responsavel: string;
    motivo: string;
    tipo: "ocorrencia" | "suspensao" | "advertencia";
    data: string;
    dias?: number;
    studentid: number;
}

const apiURL = import.meta.env.VITE_API_URL;

export default function StudentDashboard() {
    const [aulas, setAulas] = useState<any[]>([])
    const [aluno, setAluno] = useState<Student | null>(null)
    const [records, setRecords] = useState<Records[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    const getStudent = async (): Promise<Student | null> => {
        try {
            const studentResponse = await axios.get('http://localhost:3000/protected/student/me', {
                headers: {
                  'x-api-key': import.meta.env.VITE_TOKEN
                }
            });

            if (studentResponse.data.data) {
                setAluno(studentResponse.data.data)
                return studentResponse.data.data;
            } else {
                navigate("/");
                return null;
            }
        } catch (error) {
            console.error(error);
            navigate("/");
            return null;
        }
    }

    const getAulas = async () => {
        try {
            setLoading(true);
            const student = await getStudent();
            if (student) {
                try {
                    if (!student.classroomId) {
                        return setAulas([])
                    }
                    const response = await axios.get(`${apiURL}/api/leassons/next/${student.classroomId}`, {
                        headers: {
                            'x-api-key': import.meta.env.VITE_TOKEN
                        }
                    });
                    
                    if (response.data) {
                        setAulas(response.data);
                    }
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response?.status === 404) {
                        setAulas([]);
                        console.log("Nenhuma aula encontrada para esta turma");
                    } else {
                        console.error("Erro ao carregar aulas:", error);
                        alert("Erro ao carregar as aulas");
                    }
                }
            }
        } finally {
            setLoading(false);
        }
    }

    const getRecords = async () => {
        try {
            setLoading(true);
            const student = await getStudent();

            if (student) {
                try {
                    const response = await axios.get(`${apiURL}/api/students/allrecords/${student.id}`, {
                        headers: {
                            'x-api-key': import.meta.env.VITE_TOKEN
                        }
                    });

                    if (response.data) {
                        setRecords(response.data);
                    }
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response?.status === 404) {
                        setRecords([]);
                        console.log("Nenhum registro encontrada para este aluno");
                    } else {
                        console.error("Erro ao carregar registros:", error);
                        alert("Erro ao carregar os registros");
                    }
                }
            }
        } finally {
            setLoading(false);
        }
    }

    // Função para formatar a data
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    useEffect(() => {
        getAulas();
        getRecords();
    }, []);

    // Filtrar registros por tipo
    const ocorrencias = records.filter(record => record.tipo === "ocorrencia");
    const advertencias = records.filter(record => record.tipo === "advertencia");
    const suspensoes = records.filter(record => record.tipo === "suspensao");

    return (
        <s.Container>
            <StudentHeader />
            {loading ? (
                <s.Loading>Carregando...</s.Loading>
            ) : (
                <>
                    <s.Title>Olá {aluno?.nome || "não encontrado"}</s.Title>
                    <s.Cards>
                        <s.NextLessons>
                            <h1>Próximas aulas</h1>
                            <s.CardContent>
                                {aulas.length > 0 ? (
                                    aulas.map((aula) => (
                                        <s.LessonItem key={aula.id}>
                                            <h2>{aula.titulo}</h2>
                                            <p>{aula.descricao}</p>
                                            <p>Data: {formatDate(aula.inicio)}</p>
                                        </s.LessonItem>
                                    ))
                                ) : (
                                    <p>Nenhuma aula encontrada</p>
                                )}
                            </s.CardContent>
                        </s.NextLessons>
                        <s.Records>
                            <h1>Seus registros</h1>
                            <s.CardContent>
                                {records.length === 0 ? (
                                    <p>Nenhum registro encontrado</p>
                                ) : (
                                    <>
                                        {ocorrencias.length > 0 && (
                                            <>
                                                <s.RecordsSubTitles>Ocorrências</s.RecordsSubTitles>
                                                {ocorrencias.map(record => (
                                                    <s.RecordItem key={record.id} type="ocorrencia">
                                                        <h3>Ocorrência</h3>
                                                        <p><strong>Motivo:</strong> {record.motivo}</p>
                                                        <p><strong>Responsável:</strong> {record.responsavel}</p>
                                                        <p><strong>Data:</strong> {formatDate(record.data)}</p>
                                                    </s.RecordItem>
                                                ))}
                                            </>
                                        )}
                                        
                                        {advertencias.length > 0 && (
                                            <>
                                                <s.RecordsSubTitles>Advertências</s.RecordsSubTitles>
                                                {advertencias.map(record => (
                                                    <s.RecordItem key={record.id} type="advertencia">
                                                        <h3>Advertência</h3>
                                                        <p><strong>Motivo:</strong> {record.motivo}</p>
                                                        <p><strong>Responsavel:</strong> {record.responsavel}</p>
                                                        <p><strong>Data:</strong> {formatDate(record.data)}</p>
                                                    </s.RecordItem>
                                                ))}
                                            </>
                                        )}
                                        
                                        {suspensoes.length > 0 && (
                                            <>
                                                <s.RecordsSubTitles>Suspensões</s.RecordsSubTitles>
                                                {suspensoes.map(record => (
                                                    <s.RecordItem key={record.id} type="suspensao">
                                                        <h3>Suspensão</h3>
                                                        <p><strong>Motivo:</strong> {record.motivo}</p>
                                                        <p><strong>Responsavel:</strong> {record.responsavel}</p>
                                                        <p><strong>Data:</strong> {formatDate(record.data)}</p>
                                                        {record.dias && <p>Dias: {record.dias}</p>}
                                                    </s.RecordItem>
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                            </s.CardContent>
                        </s.Records>
                    </s.Cards>
                </>
            )}
        </s.Container>
    )
}
