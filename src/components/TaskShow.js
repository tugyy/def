import { useState } from "react";
import TaskCreate from "./TaskCreate";
import { useContext } from "react";
import TasksContext from "../context/task";

function TaskShow({ task }) {
  const { deleteTaskById, editTaskById } = useContext(TasksContext);

  const [showEdit, setShowEdit] = useState(false);
  const handleDeleteClick = () => {
    // onDelete(task.id);
    deleteTaskById(task.id);
  };
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };
  const handleSubmit = (id, updatedTitle, updatedDesc) => {
    setShowEdit(false);
    // onUpdate(id, updatedTitle, updatedDesc);
    editTaskById(id, updatedTitle, updatedDesc);
  };
  return (
    <div className="showDiv editeDiv">
      {showEdit ? (
        <TaskCreate task={task} taskFormUpdate={true} onUpdate={handleSubmit} />
      ) : (
        <div>
          <h3>Göreviniz!</h3>
          <p>{task.title}</p>
          <h3>Yapılacaklar</h3>
          <p>{task.desc}</p>
          <div>
            <button className="deleteButton" onClick={handleDeleteClick}>
              Sil
            </button>
            <button className="updateButton" onClick={handleEditClick}>
              Güncelle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default TaskShow;
