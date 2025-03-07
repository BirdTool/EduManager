import { Container, Description, Title, DescriptionContainer, ButtonContainer } from './styles';
import registerButton from '../../components/buttons/Register/index';
import signUpButton from '../../components/buttons/Sign-Up/index';

const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quam commodi fuga nobis vero sequi, aspernatur quod nesciunt quasi. Quod vero explicabo atque itaque accusantium dicta facere ad commodi? Dolorum."
const lorem2 = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim expedita sed dolores excepturi adipisci. Quasi, soluta. Dolorum, atque ab vitae ipsum reiciendis consectetur quis ea labore vel beatae magni tenetur."

function Home() {
    return (
        <Container>
            <Title>Escola Municipal Senne</Title>
            <DescriptionContainer>
                <Description>{lorem}</Description>
                <br />
                <Description>{lorem2}</Description>
            </DescriptionContainer>
            <ButtonContainer>
                {registerButton()}
                <br />
                {signUpButton()}
            </ButtonContainer>
        </Container>
    )
}

export default Home
