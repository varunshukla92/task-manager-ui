import { useEffect, useState } from "react";
import { Spinner, Alert, Table, Button } from "react-bootstrap";
import { getTasks, deleteTask } from "../services/task.service";
import { type Task } from "../types/task";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getTasks();
      setTasks(data);
    } catch {
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);

      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch {
      alert("Failed to delete task.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!tasks.length) {
    return <Alert variant="info">No tasks found.</Alert>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.status}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(task.id)}
                disabled={deletingId === task.id}
              >
                {deletingId === task.id ? "Deleting..." : "Delete"}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Tasks;
