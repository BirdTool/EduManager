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
    font-family: Arial, sans-serif;
    color: #fff;
`;

export const TypeForumulary = styled.div`
    display: flex;
    gap: 20px;
`

export const ButtonTypeFormulary = styled.button`
    color: #ffffff;
    background-color: #0b0b0b;
    border: #ffffff;
    border-radius: 10px;
    padding: 8px;
    transition: all 0.3s ease;
    &:hover {
        background-color: #ffffff;
        color: #0b0b0b;
        border: #0b0b0b;
        cursor: pointer;
        padding: 10px;
    }
`

export const Formulary = styled.div`
    background-color: #333333;
    border-radius: 10px;
    padding: 20px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Input = styled.input`
    color: #ffffff;
    background-color: #232323;
    padding: 14px;
    border: #ffffff;
    border-radius: 10px;
    margin-top: 20px;
`

export const Button = styled.button`
    color: #ffffff;
    background-color: #0b0b0b;
    border: #ffffff;
    border-radius: 10px;
    padding: 8px;
    transition: all 0.3s ease;
    margin-top: 20px;
    &:hover {
        background-color: #ffffff;
        color: #0b0b0b;
        border: #0b0b0b;
        cursor: pointer;
        padding: 10px;
    }
`

export const ErrorInput = styled.p`
    margin-top: 5px;
    font-size: 12px;
    color: #ff0000;
    font-weight: bold;
    border: #ffffff;
`
