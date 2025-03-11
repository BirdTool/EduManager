import * as styles from './styles';
import { useState } from 'react';

function Register() {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [matricula, setMatricula] = useState<string>('');

    const renderForm = () => {
        switch (selectedType) {
            case 'student':
                return (
                    <styles.Formulary>
                        <h2>Registro de Aluno</h2>
                        <styles.Input
                            type="text"
                            placeholder="Nome completo"
                            value={name} // Vincula o valor ao estado
                            onChange={(e) => setName(e.target.value)} // Atualiza o estado
                        />
                        <styles.Input
                            type="text"
                            placeholder="Matrícula"
                            value={matricula} // Vincula o valor ao estado
                            onChange={(e) => setMatricula(e.target.value)} // Atualiza o estado
                        />
                        <styles.Button>Registrar como Aluno</styles.Button>
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