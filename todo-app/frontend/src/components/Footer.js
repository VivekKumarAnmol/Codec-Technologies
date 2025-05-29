import styled from "styled-components";

const FooterContainer = styled.footer`
    background: #4A90E2;
    color: white;
    text-align: center;
    padding: 15px;
    font-size: 14px;
    position: absolute;
    bottom: 0;
    width: 100%;
`;


const Footer = () => {
    return (
        <FooterContainer>
            © 2025 Todo-App | All rights reserved
        </FooterContainer>
    );
};

export default Footer;
