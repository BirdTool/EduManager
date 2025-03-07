import styled from 'styled-components';


export const Container = styled.div`
    background-color: #1a1a1a;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 120px;
`;


export const Title = styled.h1`
    font-size: 24px;
    color: #ffffff;
    font-family: Arial, sans-serif;
    transition: text-shadow 0.3s ease;

    &:hover {
        text-shadow: 0 0 10px #8fd149,
                     0 0 20px #8fd149,
                     0 0 30px #8fd149;
    }
`;

export const DescriptionContainer = styled.div`
    background-color: #1a1a1a;
    margin-top: 20px;
    width: 80%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    gap: 40px;
`

export const Description = styled.p`
    font-size: 16px;
    color: #ffffff;
    font-family: Arial, sans-serif;
    margin-bottom: 10px;
    flex: 1;
    padding: 20px;
`

export const ButtonContainer = styled.div`
    display: flex;
    margin-top: 5%;
    gap: 30px;
`