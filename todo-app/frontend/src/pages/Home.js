import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    height: 80vh;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, #4A90E2, #ffffff);
`;

const LeftHalf = styled.div`
    flex: 1;
    // display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
`;

const Title = styled.h1`
    margin-top: -30px; /* Moves text upward */
`;

const RightHalf = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const Button = styled(Link)`
    width: 200px;
    padding: 12px;
    margin: 10px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    display: inline-block;
`;

const RegisterButton = styled(Button)`
    background: #4A90E2;
    color: white;
    &:hover {
        background: #357ABD;
    }
`;

const LoginButton = styled(Button)`
    background: #ccc;
    color: black;
    &:hover {
        background: #888;
        color: white;
    }
`;

const Home = () => {
    return (
        <Container>
            <LeftHalf>
                <Title>Todo - App</Title>
                <p>Do Your Task on Time</p>
            </LeftHalf>
            <RightHalf>
                <h2>If first-time user</h2>
                <RegisterButton to="/register">Register</RegisterButton>
                <h2>Already logged user</h2>
                <LoginButton to="/login">Login</LoginButton>
            </RightHalf>
        </Container>
    );
};

export default Home;
