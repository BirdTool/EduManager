import * as styles from './styles';
import { useState } from 'react';
import { z } from 'zod';
import { loginSchemaStudent, loginSchemaManagement, loginSchemaTeacher } from '../../schemas/loginSchema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    // Student States
    const [studentForm, setStudentForm] = useState({
        name: '',
        matricula: '0000-00-00'
    });

    // Teacher States
    const [teacherForm, setTeacherForm] = useState({
        email: '',
        password: ''
    });

    // Staff States
    const [staffForm, setStaffForm] = useState({
        email: '',
        password: ''
    });

    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [errors, setErrors] = useState<any>({});
    const clearFieldError = (field: string) => {
        setErrors((prev: Record<string, string>) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };

    const handleSubmit = async (type: string) => {
        try {
            switch (type) {
                case 'student': {
                    await loginSchemaStudent.parseAsync(studentForm);
                    const validateMatricula = (matricula: string): boolean => {
                        const parts = matricula.split("-");
                        if (parts.length !== 3) return false;
                        const [year, schoolID, studentID] = parts.map(Number);
                        return !isNaN(year) && !isNaN(schoolID) && !isNaN(studentID);
                    };
                
                    if (!validateMatricula(studentForm.matricula)) {
                        setErrors({ matricula: "Matrícula inválida" });
                        return;
                    } else {
                        clearFieldError('matricula');
                        try {
                            const response = await axios.post('http://localhost:3000/login/student', studentForm, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'x-api-key': import.meta.env.VITE_TOKEN
                                }
                            });
                
                            const data = response.data;
                            console.log('Response data:', data);
                
                            if (response.status === 200 && data.success) {
                                navigate('/student/dashboard');
                            } else {
                                alert(data.message || "Erro ao fazer login. Tente novamente.");
                            }
                        } catch (error) {
                            console.error("Erro na requisição:", error);
                            alert("Erro ao conectar com o servidor.");
                        }
                    }
                    break;
                }
                case 'teacher':
                    await loginSchemaTeacher.parseAsync(teacherForm);
                    break;
                case 'staff':
                    await loginSchemaManagement.parseAsync(staffForm);
                    break;
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path) {
                        newErrors[err.path[0]] = err.message;
                    }
                });
                setErrors(newErrors);
            }
        }
    };


    const renderForm = () => {
        switch (selectedType) {
            case 'student':
                return (
                    <styles.Formulary>
                        <h2>Login de Aluno</h2>
                        <styles.FormGroup>
                            <styles.Label>Nome Completo</styles.Label>
                            <styles.Input
                                type="text"
                                placeholder="Digite seu nome completo"
                                value={studentForm.name}
                                onChange={(e) => {
                                    setStudentForm({ ...studentForm, name: e.target.value });
                                    clearFieldError('name');
                                }}
                            />
                            {errors.name && <styles.ErrorMessage>{errors.name}</styles.ErrorMessage>}
                        </styles.FormGroup>
                        <styles.FormGroup>
                            <styles.Label>Matricula</styles.Label>
                            <styles.Input
                                type="text"
                                placeholder="Digite sua matricula"
                                value={studentForm.matricula}
                                onChange={(e) => {
                                    setStudentForm({ ...studentForm, matricula: e.target.value });
                                    clearFieldError('matricula');
                                }}
                            />
                            {errors.matricula && <styles.ErrorMessage>{errors.matricula}</styles.ErrorMessage>}
                        </styles.FormGroup>

                        <styles.Button
                            type="button"
                            onClick={() => handleSubmit('student')}
                        >
                            Logar como {studentForm.name.split(' ')[0] || 'Aluno'}
                        </styles.Button>


                    </styles.Formulary>
                );
            case 'teacher':
                return (
                    <styles.Formulary>
                        <h2>Registro de Professor</h2>
                        <styles.Input type="text" placeholder="Nome completo" />
                        <styles.Input type="email" placeholder="Email" />
                        <styles.Input type="password" placeholder="Senha" />
                        <styles.Input type="text" placeholder="Área de ensino" />
                        <styles.Button>Registrar como Professor</styles.Button>
                    </styles.Formulary>
                );
            case 'staff':
                return (
                    <styles.Formulary>
                        <h2>Registro de Funcionário</h2>
                        <styles.Input type="text" placeholder="Nome completo" />
                        <styles.Input type="email" placeholder="Email" />
                        <styles.Input type="password" placeholder="Senha" />
                        <styles.Input type="text" placeholder="Cargo" />
                        <styles.Button>Registrar como Funcionário</styles.Button>
                    </styles.Formulary>
                );
            default:
                return null;
        }
    };

    return (
        <styles.Container>
            <h1>Registro</h1>
            <br />
            <p>Escolha o tipo de registro</p>
            <br />
            <styles.TypeForumulary>
                <styles.ButtonTypeFormulary onClick={() => setSelectedType('student')}>
                    Registrar-se como aluno
                </styles.ButtonTypeFormulary>
                <styles.ButtonTypeFormulary onClick={() => setSelectedType('teacher')}>
                    Registrar-se como professor
                </styles.ButtonTypeFormulary>
                <styles.ButtonTypeFormulary onClick={() => setSelectedType('staff')}>
                    Registrar-se como funcionário maior
                </styles.ButtonTypeFormulary>
            </styles.TypeForumulary>
            <br />
            <br />
            {renderForm()}
        </styles.Container>
    );
}

export default Register;