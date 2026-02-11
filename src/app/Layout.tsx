import { type ReactNode } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {isAuthenticated && (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/tasks">
              Mini Jira
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/tasks">
                Tasks
              </Nav.Link>
            </Nav>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Container>
        </Navbar>
      )}

      <Container className="mt-4">{children}</Container>
    </>
  );
}
