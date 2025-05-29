import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #4a90e2;
  padding: 2px 30px;
  color: white;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavButton = styled(Link)`
  padding: 10px 15px;
  background: white;
  color: #4a90e2;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    background: #357abd;
    color: white;
  }
`;

const Navbar = () => {
  const location = useLocation(); // ✅ Gets current page URL

  return (
    <NavContainer>
      <h2>Todo - App</h2>
      <NavLinks>
        {/* <NavButton to="/">Home</NavButton> */}
        {/* ✅ Show Login/Register only on Home */}
        {location.pathname === "/" && (
          <>
            <NavButton to="/login">Login</NavButton>
            <NavButton to="/register">Register</NavButton>
          </>
        )}
        {location.pathname !== "/todos" && <NavButton to="/">Home</NavButton>}

        {/* ✅ Show Logout only on TodoList */}
        {location.pathname === "/todos" && <NavButton to="/">Logout</NavButton>}
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;
