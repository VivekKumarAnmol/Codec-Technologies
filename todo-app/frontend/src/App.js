import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoList from "./pages/TodoList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const expiryTime = decodedToken.exp * 1000; // ✅ Convert expiry to milliseconds

                    if (new Date().getTime() < expiryTime) {
                        setIsAuthenticated(true); // ✅ Token is valid
                    } else {
                        setIsAuthenticated(false);
                        localStorage.removeItem("token"); // ✅ Auto logout after expiry
                        localStorage.removeItem("userEmail");
                        localStorage.removeItem("tokenExpiry");
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                    setIsAuthenticated(false);
                    localStorage.removeItem("token");
                    localStorage.removeItem("userEmail");
                    localStorage.removeItem("tokenExpiry");
                }
            } else {
                setIsAuthenticated(false);
            }
        };

        checkAuth(); // ✅ Run on mount
        const interval = setInterval(checkAuth, 5000); // ✅ Check every 5 seconds

        return () => clearInterval(interval); // ✅ Cleanup interval on unmount
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* ✅ Protected Route for TodoList */}
                <Route 
                    path="/todos" 
                    element={isAuthenticated ? <TodoList /> : <Navigate to="/login" />} 
                />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
