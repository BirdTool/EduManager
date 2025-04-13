import * as s from "./styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const menuItems = [
        
        { text: "Atestado", index: 0, path: "/student/atestado" },
        { text: "Histórico", index: 1, path: "/student/historico" },
        { text: "Notas", index: 2, path: "/student/notas" },
        { text: "Faltas", index: 3, path: "/student/faltas" }
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
        setMenuOpen(false); // Fecha o menu após clicar
    };

    return (
        <s.Header>
            <s.LogoContainer>
                <img src="/schoollogo.png" alt="School Logo" style={{ width: '80px', height: 'auto' }} />
                <s.Title onClick={() => navigate("/student/dashboard")}>Portal do estudante</s.Title>
                <s.MenuButton onClick={toggleMenu}>
                    {menuOpen ? "✕" : "☰"}
                </s.MenuButton>
            </s.LogoContainer>
            <s.Nav isMenuOpen={menuOpen}>
                <ul>
                    {menuItems.map((item) => (
                        <li 
                            key={item.index} 
                            style={{ '--item-index': item.index } as React.CSSProperties}
                            onClick={() => handleNavigation(item.path)}
                        >
                            {item.text}
                        </li>
                    ))}
                </ul>
            </s.Nav>
        </s.Header>
    )
}
