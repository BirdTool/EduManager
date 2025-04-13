import * as s from "./styles";
import StudentHeader from "../../../components/header/studentHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { Student } from "../../../types/studentType";
import { useNavigate } from "react-router-dom";

export default function StudentCertificate() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [aluno, setAluno] = useState<Student | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = () => {
        console.log("Submitting file:", selectedFile);
    };

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

    useEffect(() => {
        getStudent()
    }, []);

    return (
        <>
            <StudentHeader />
            <s.Container>
                <h1>Atestado</h1>
                <p>Mande foto do atestado para avaliação</p>
                <s.FileInputContainer>
                    <s.File type="file" onChange={handleFileChange} />
                    {selectedFile && (
                        <s.FileName>Arquivo selecionado: {selectedFile.name}</s.FileName>
                    )}
                </s.FileInputContainer>
                <s.ButtonInput onClick={handleSubmit}>Enviar</s.ButtonInput>
                <s.Footer>Aluno: {aluno?.nome}</s.Footer>
            </s.Container>
        </>
    )
}
