import { createContext } from "react";
import axios from "axios";
import { useState } from "react";

const TasksContext = createContext();

function Provider({ children }) {
  const [tasks, setTasks] = useState([]);
  const createTask = async (title, desc) => {
    const response = await axios.post("http://localhost:3001/tasks", {
      title,
      desc,
    });
    const createdTasks = [...tasks, response.data];
    setTasks(createdTasks);
  };
  const fetchTask = async () => {
    const response = await axios.get("http://localhost:3001/tasks");
    setTasks(response.data);
  };
  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    const afterDeletingTask = tasks.filter((task) => {
      return task.id != id;
    });
    setTasks(afterDeletingTask);
  };
  const editTaskById = async (id, updatedTitle, updatedDesc) => {
    await axios.put(`http://localhost:3001/tasks/${id}`, {
      title: updatedTitle,
      desc: updatedDesc,
    });
    const updateTask = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: updatedTitle, desc: updatedDesc };
      }
      return task;
    });
    setTasks(updateTask);
  };
  const sharedValuesAndaMethods = {
    tasks,
    createTask,
    fetchTask,
    deleteTaskById,
    editTaskById,
  };
  return <TasksContext.Provider value={sharedValuesAndaMethods}>{children}</TasksContext.Provider>;
}

export { Provider };
export default TasksContext;
