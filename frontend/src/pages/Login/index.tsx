import axios from 'axios';
import * as styles from './styles';
import { useState } from 'react';

interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        name: string;
        matricula: string;
        csrfToken: string;
    };
}

function Login() {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [matricula, setMatricula] = useState<string>('');

    const statusName: string | null = !name ? "Insira um nome válido" : null;

    const validateMatricula = (matricula: string): string | null => {
        const parts = matricula.split("-");
        
        if (parts.length !== 3) {
            return "Forneça uma matricula válida";
        }

        const [year, second, third] = parts.map(Number);
        
        if (isNaN(year) || isNaN(second) || isNaN(third)) {
            return "Forneça uma matricula válida";
        }

        if (year < 1900 || second <= 0 || third <= 0) {
            return "Forneça uma matricula válida";
        }

        return null;
    };

    const statusMatricula = validateMatricula(matricula);
    

    const handleLogin = async () => {
        try {
            const response = await axios.put<LoginResponse>(
                'http://localhost:3000/login/student',
                { name, matricula },
                {
                    headers: {
                        'x-api-key': import.meta.env.VITE_TOKEN,
                    },
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                alert('Login bem-sucedido');
            } else {
                console.log(response.data.message);
                alert(response.data.message);
            }
        } catch (err) {
            console.log(err);
            alert('Erro ao fazer login');
        }
    };

    const renderForm = () => {
        switch (selectedType) {
            case 'student':
                return (
                    <styles.Formulary>
                        <h2>Login de Aluno</h2>
                        <styles.Input
                            type="text"
                            placeholder="Nome completo"
                            value={name} // Vincula o valor ao estado
                            onChange={(e) => setName(e.target.value)} // Atualiza o estado
                        />
                        <styles.ErrorInput>{statusName}</styles.ErrorInput>
                        <styles.Input
                            type="text"
                            placeholder="Matrícula"
                            value={matricula} // Vincula o valor ao estado
                            onChange={(e) => setMatricula(e.target.value)} // Atualiza o estado
                        />
                        <styles.ErrorInput>{statusMatricula}</styles.ErrorInput>
                        <styles.Button onClick={handleLogin}>Login como Aluno</styles.Button>
                    </styles.Formulary>
                );
            case 'teacher':
                return (
                    <styles.Formulary>
                        <h2>Login de Professor</h2>
                        <styles.Input type="text" placeholder="Nome completo" />
                        <styles.Input type="email" placeholder="Email" />
                        <styles.Input type="password" placeholder="Senha" />
                        <styles.Input type="text" placeholder="Área de ensino" />
                        <styles.Button>Login como Professor</styles.Button>
                    </styles.Formulary>
                );
            case 'staff':
                return (
                    <styles.Formulary>
                        <h2>Login de Funcionário</h2>
                        <styles.Input type="text" placeholder="Nome completo" />
                        <styles.Input type="email" placeholder="Email" />
                        <styles.Input type="password" placeholder="Senha" />
                        <styles.Input type="text" placeholder="Cargo" />
                        <styles.Button>Login como Funcionário</styles.Button>
                    </styles.Formulary>
                );
            default:
                return null;
        }
    };

    return (
        <styles.Container>
            <h1>Login</h1>
            <br />
            <p>Escolha o tipo de login</p>
            <br />
            <styles.TypeForumulary>
                <styles.ButtonTypeFormulary onClick={() => setSelectedType('student')}>
                    Logar como aluno
                </styles.ButtonTypeFormulary>
                <styles.ButtonTypeFormulary onClick={() => setSelectedType('teacher')}>
                    Logar como professor
                </styles.ButtonTypeFormulary>
                <styles.ButtonTypeFormulary onClick={() => setSelectedType('staff')}>
                    Logar como funcionário maior
                </styles.ButtonTypeFormulary>
            </styles.TypeForumulary>
            <br />
            <br />
            {renderForm()}
        </styles.Container>
    );
}

export default Login;