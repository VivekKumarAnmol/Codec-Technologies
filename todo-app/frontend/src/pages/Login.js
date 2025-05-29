import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background: linear-gradient(to bottom, #4a90e2, #ffffff);
`;

const LoginCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Input = styled.input`
  width: 90%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #357abd;
  }
`;

const ForgotPassword = styled.a`
  display: block;
  margin-top: 10px;
  color: #4a90e2;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/auth/login", { email, password });

        if (response.data.success) {
            const token = response.data.token;
            const decodedToken = jwtDecode(token); // ✅ Decode JWT
            const expiryTime = decodedToken.exp * 1000; // ✅ Convert expiry to milliseconds

            localStorage.setItem("userEmail", email);
            localStorage.setItem("token", token);
            localStorage.setItem("tokenExpiry", expiryTime); // ✅ Store expiry timestamp

            navigate("/todos"); // ✅ Redirect after login
        }
    } catch (err) {
        console.error("Login failed:", err);
    }
};


  return (
    <LoginContainer>
      <LoginCard>
        <h2>LOGIN</h2>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">LOGIN</Button>
          <ForgotPassword href="#">FORGOT PASSWORD?</ForgotPassword>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
