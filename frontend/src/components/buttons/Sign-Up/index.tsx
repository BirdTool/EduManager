import { Button } from "./style"

interface SignUpButtonProps {
    onClick: () => void;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ onClick }) => {
    return (
        <Button onClick={onClick}>Entrar</Button>
    );
};

export default SignUpButton;