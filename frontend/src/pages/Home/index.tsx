import { Container, Description, Title, DescriptionContainer, ButtonContainer } from './styles';
import { useNavigate } from 'react-router-dom';
import SignUpButton from '../../components/buttons/Sign-Up/index';
const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quam commodi fuga nobis vero sequi, aspernatur quod nesciunt quasi. Quod vero explicabo atque itaque accusantium dicta facere ad commodi? Dolorum."
const lorem2 = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim expedita sed dolores excepturi adipisci. Quasi, soluta. Dolorum, atque ab vitae ipsum reiciendis consectetur quis ea labore vel beatae magni tenetur."

function Home() {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/login');
    }

    return (
        <Container>
            <Title>Escola Municipal Senne</Title>
            <DescriptionContainer>
                <Description>{lorem}</Description>
                <br />
                <Description>{lorem2}</Description>
            </DescriptionContainer>
            <ButtonContainer>
                <SignUpButton onClick={handleSignUpClick} />
            </ButtonContainer>
        </Container>
    )
}

export default Home
