import styled from "styled-components";

export const Container = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    color: white;
    width: 100%;
`;

export const CardContent = styled.div`
    position: absolute;
    top: 10vh;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 5vh;
    overflow-y: auto;
    max-height: 80%;
    padding-right: 10px;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(20, 90, 20, 0.6);
        border-radius: 4px;
    }
`;

export const NextLessons = styled.div`
    margin: 10px;
    box-shadow: 0px 0px 10px 0px rgb(20, 90, 20);
    border-radius: 10px;
    padding: 24vh 2vh 2vh 2vh;
    background-color: rgb(31, 31, 31);
    position: relative;
    width: 45%;
    height: 50vh;
    min-width: 300px;
    
    @media (max-width: 900px) {
        width: 90%;
        margin: 10px auto;
    }
    
    @media (max-width: 768px) {
        width: 90%;
        height: 40vh;
        margin: 10px auto;
    }
    
    h1 {
        position: absolute;
        top: 0;
        left: 0;
        margin-left: 5vh;
        margin-top: 3vh;
        margin-bottom: 3vh;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0);
    }
`;

export const Title = styled.h1`
    margin-left: 8vh;
    margin-top: 3vh;
    margin-bottom: 4vh;
    
    @media (max-width: 768px) {
        margin-left: 4vh;
        font-size: 24px;
    }
`;

export const RecordsSubTitles = styled.h2`
    margin-top: 15px;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Records = styled.div`
    margin: 10px;
    box-shadow: 0px 0px 10px 0px rgb(20, 90, 20);
    border-radius: 10px;
    padding: 24vh 2vh 2vh 2vh;
    background-color: rgb(31, 31, 31);
    position: relative;
    width: 45%;
    height: 50vh;
    min-width: 300px;
    
    @media (max-width: 900px) {
        width: 90%;
        margin: 10px auto;
    }
    
    @media (max-width: 768px) {
        width: 90%;
        height: 40vh;
        margin: 10px auto;
    }
    
    h1 {
        position: absolute;
        top: 0;
        left: 0;
        margin-left: 5vh;
        margin-top: 3vh;
        margin-bottom: 3vh;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0);
    }
`;

export const Cards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    
    @media (max-width: 900px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const LessonItem = styled.div`
    margin-bottom: 15px;
    padding: 10px;
    background-color: rgba(20, 90, 20, 0.1);
    border-radius: 5px;
    
    h2 {
        font-size: 18px;
        margin-bottom: 5px;
    }
    
    p {
        margin: 5px 0;
    }
`;

export const RecordItem = styled.div<{ type: 'ocorrencia' | 'advertencia' | 'suspensao' }>`
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    background-color: ${props => {
        switch (props.type) {
            case 'ocorrencia': return 'rgba(255, 204, 0, 0.2)'; // Amarelo
            case 'advertencia': return 'rgba(255, 102, 0, 0.2)'; // Laranja
            case 'suspensao': return 'rgba(255, 0, 0, 0.2)'; // Vermelho
            default: return 'rgba(255, 255, 255, 0.1)';
        }
    }};
    border-left: 4px solid ${props => {
        switch (props.type) {
            case 'ocorrencia': return 'rgb(255, 204, 0)'; // Amarelo
            case 'advertencia': return 'rgb(255, 102, 0)'; // Laranja
            case 'suspensao': return 'rgb(255, 0, 0)'; // Vermelho
            default: return 'rgb(255, 255, 255)';
        }
    }};
    
    h3 {
        font-size: 16px;
        margin-bottom: 5px;
        color: ${props => {
            switch (props.type) {
                case 'ocorrencia': return 'rgb(255, 204, 0)'; // Amarelo
                case 'advertencia': return 'rgb(255, 102, 0)'; // Laranja
                case 'suspensao': return 'rgb(255, 0, 0)'; // Vermelho
                default: return 'white';
            }
        }};
    }
    
    p {
        margin: 5px 0;
    }
`;

export const Loading = styled.p`
    font-size: 32px;
    text-align: center;
    margin-top: 20px;
    color: rgb(41, 72, 30);
    border-color: #fff;
    border-radius: 10px;
`;