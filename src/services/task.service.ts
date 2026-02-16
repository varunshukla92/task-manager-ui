import httpClient from "./httpClient";
import { type Task } from "../types/task";

const TASKS_ENDPOINT = "/tasks/api/v1/tasks/GetAll";

export const getTasks = async (): Promise<Task[]> => {
  const response = await httpClient.get<Task[]>(TASKS_ENDPOINT);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await httpClient.delete(`/tasks/api/v1/tasks/${id}`);
};
