import { type ReactNode } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin = user?.role === "Admin";

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
                Task List
              </Nav.Link>

              <Nav.Link as={Link} to="/tasks/create">
                Create Task
              </Nav.Link>

              {isAdmin && (
                <Nav.Link as={Link} to="/admin/users">
                  Manage Users
                </Nav.Link>
              )}
            </Nav>

            <Nav className="ms-auto align-items-center">
              {user && <span className="text-white me-3">{user.email}</span>}

              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Container>
        </Navbar>
      )}

      <Container className="mt-4">{children}</Container>
    </>
  );
}
