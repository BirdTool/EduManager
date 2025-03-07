import styled from 'styled-components';

export const Button = styled.button`
    background-color: #0e1016;
    color: #ffffff;
    border-color: #ffffff;
    padding: 15px 30px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.5s ease, padding 0.5s ease, color 0.5s ease;
    border-radius: 10px;
    &:hover {
        background-color: #8fd149;
        color: #0e1016;
        padding: 17px 32px;
    }
`;