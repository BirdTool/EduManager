import styled from 'styled-components';

export const Container = styled.div`
  background-color: transparent; /* Agora transparente pois o body já tem o fundo escuro */
  min-height: 100vh;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: #333333;
`;

export const StudentHeader = styled.div`
  margin-bottom: 2rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const StudentName = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const StudentInfo = styled.p`
  color: #666;
  margin-bottom: 0.25rem;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  position: relative;
  
  /* Sombra verde mais visível */
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: transparent;
    border-radius: 1rem;
    z-index: -1;
    box-shadow: 0 0 25px rgba(0, 255, 128, 0.4);
    pointer-events: none;
  }
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    
    &::after {
      left: -15px;
      right: -15px;
    }
  }
`;

export const Card = styled.div`
  background-color:rgb(19, 19, 19);
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 15px rgba(0, 128, 0, 0.4);
  position: relative;
  z-index: 1;
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2563eb;
`;

export const ClassList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ClassItem = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 0.75rem;
`;

export const ClassSubject = styled.h3`
  font-weight: 600;
`;

export const ClassInfo = styled.p`
  font-size: 0.875rem;
  color: #666;
`;

export const RecordSection = styled.div`
  margin-bottom: 1rem;
`;

export const RecordTitle = styled.h3<{ type: 'warning' | 'occurrence' | 'suspension' }>`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => {
    switch (props.type) {
      case 'warning': return '#ca8a04';
      case 'occurrence': return '#ea580c';
      case 'suspension': return '#dc2626';
      default: return '#333';
    }
  }};
`;

export const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const RecordItem = styled.div<{ type: 'warning' | 'occurrence' | 'suspension' }>`
  padding: 0.75rem;
  border-radius: 0.375rem;
  background-color: ${props => {
    switch (props.type) {
      case 'warning': return '#fefce8';
      case 'occurrence': return '#fff7ed';
      case 'suspension': return '#fef2f2';
      default: return '#f9fafb';
    }
  }};
`;

export const RecordDescription = styled.p`
  font-size: 0.875rem;
`;

export const RecordDate = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const EmptyMessage = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`;

export const ErrorMessage = styled.div`
  padding: 1rem;
  color: #ef4444;
  font-weight: bold;
  font-family: Arial, sans-serif;
  background-color: #121212; /* Fundo escuro para a mensagem de erro */
`;

export const LoadingMessage = styled.div`
  padding: 1rem;
  color: #6b7280;
  font-family: Arial, sans-serif;
  background-color: #121212; /* Fundo escuro para a mensagem de carregamento */
`;