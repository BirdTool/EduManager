import styled, { keyframes } from "styled-components";

export const Header = styled.header`
    background-color: #1a1a1a;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 8px;
    }
`;

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    @media (max-width: 768px) {
        margin-bottom: 10px;
        width: 100%;
        justify-content: space-between;
    }

    :hover {
        cursor: pointer;
    }
`;

export const Title = styled.h1`
    font-family: 'Georgia', 'Times New Roman', serif;
    margin: 0;
    font-size: 1.8rem;
    letter-spacing: 0.5px;
    color: #f8f8f8;
    font-style: italic;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
        font-size: 1.4rem;
    }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 300px;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
    max-height: 300px;
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
    max-height: 0;
  }
`;

interface NavProps {
    isMenuOpen: boolean;
}

export const Nav = styled.nav<NavProps>`
    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        overflow: hidden;
        display: ${props => props.isMenuOpen ? 'block' : 'none'};
        animation: ${props => props.isMenuOpen ? slideDown : slideUp} 0.3s ease-in-out forwards;
        transform-origin: top center;
    }

    ul {
        list-style: none;
        display: flex;
        gap: 20px;
        margin: 0;
        padding: 0;

        @media (max-width: 768px) {
            flex-direction: column;
            gap: 10px;
            margin-top: 10px;
        }
    }

    li {
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 8px 12px;
        border-radius: 4px;
        font-weight: 500;

        &:hover {
            color: #48c038;
            background-color: rgba(72, 192, 56, 0.1);
        }

        @media (max-width: 768px) {
            padding: 12px;
            border-bottom: 1px solid #333;
            width: 100%;
            opacity: 0;
            animation: ${props => props.isMenuOpen ? 'fadeIn 0.5s forwards' : 'none'};
            animation-delay: calc(0.1s * var(--item-index, 0));
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
    }
`;

export const MenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        display: block;
    }
`;
