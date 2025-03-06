import styled from 'styled-components';


export const Container = styled.div`
    background-color: #1a1a1a;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
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
