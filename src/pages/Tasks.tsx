import { useEffect, useState } from "react";
import { Spinner, Alert, Table } from "react-bootstrap";
import { getTasks } from "../services/task.service";
import { type Task } from "../types/task";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getTasks();
      setTasks(data);
    } catch (err: any) {
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
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

  if (!loading && tasks.length === 0) {
    return <Alert variant="info">No tasks found.</Alert>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Priority</th>
          <th>DueDate</th>
          <th>CreatedAt</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.status}</td>
            <td>{task.priority}</td>
            <td>{task.dueDate}</td>
            <td>{task.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Tasks;
