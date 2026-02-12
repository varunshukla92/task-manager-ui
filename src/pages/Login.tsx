import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { loginApi } from "../auth/auth.service";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await loginApi({ email, password });
      login(response.accessToken);
      navigate("/tasks");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center vh-100">
      <h1>Task Management System</h1>
      <Card style={{ width: "350px", marginTop: "10%" }} className="shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Login</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              className="w-100"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
