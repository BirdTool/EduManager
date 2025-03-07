import { Button } from "./style"

interface RegisterButtonsProps {
    onClick: () => void;
}

const RegisterButton: React.FC<RegisterButtonsProps> = ({ onClick }) => {
    return (
        <Button onClick={onClick}>Registrar-se</Button>
    )
}

export default RegisterButton