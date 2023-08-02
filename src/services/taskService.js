import axios from "axios";

const API_URL = "https://task-backend-t04b.onrender.com/api/task";

export const fetchTasks = () => axios.get(API_URL + "/getTask");

export const createTask = (task) => axios.post(API_URL + "/createTask", task);

export const updateTaskStatus = (taskId, task) =>
  axios.patch(`${API_URL}/updatetask/${taskId}`, {
    title: task.title,
    description: task.description,
    status: task.status,
  });

export const deleteTask = (taskId) =>
  axios.delete(`${API_URL}/deletetask/${taskId}`);
