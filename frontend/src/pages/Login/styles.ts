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
    gap: 20px;
`

export const Input = styled.input`
    color: #ffffff;
    background-color: #232323;
    padding: 14px;
    border: #ffffff;
    border-radius: 10px;
`

export const Button = styled.button`
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

export const Select = styled.select`
    color: #ffffff;
    background-color: #232323;
    padding: 14px;
    border: 1px solid #444;
    border-radius: 10px;
    width: 100%;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 10px center;
    
    option {
        padding: 16px;
        background-color: #333333;
        color: #ffffff;
        border: none;
    }

    &:hover {
        border-color: #666;
        background-color: #2a2a2a;
    }

    &::-ms-expand {
        display: none;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #ffffff33;
        border-color: #666;
    }
`

export const FormGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const Label = styled.label`
    color: #ffffff;
    font-size: 14px;
    margin-left: 4px;
`

export const ErrorMessage = styled.span`
    color: #ff4444;
    font-size: 12px;
    margin-left: 4px;
`