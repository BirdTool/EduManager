import styled from "styled-components";

export const Container = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding-top: 5vh;
    margin: 50px auto;
    max-width: 500px;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    
    h1 {
        margin-bottom: 20px;
        color: #333;
    }
    
    p {
        margin-bottom: 30px;
        color: #666;
    }

    @media (max-width: 600px) {
        max-width: 70%;
    }
`;

export const FileInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
`;

export const File = styled.input`
    padding: 10px;
    margin: 10px 0;
    border: 2px solid #333;
    border-radius: 8px;
    background-color: #f5f5f5;
    color: #333;
    cursor: pointer;
    width: 100%;

    &:hover {
        background-color: #e0e0e0;
    }

    &::-webkit-file-upload-button {
        background-color: #333;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
`;

export const FileName = styled.div`
    margin-top: 10px;
    font-size: 14px;
    color: #555;
    word-break: break-all;
    max-width: 100%;
`;

export const ButtonInput = styled.button`
    background-color: #333;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 16px;
    margin-top: 10px;
    transition: 0.3s;
    
    &:hover {
        cursor: pointer;
        background-color: rgb(25, 28, 24);
    }
`;

export const Footer = styled.p`
    margin-top: 8vh;
    margin-bottom: 0px;
`;
