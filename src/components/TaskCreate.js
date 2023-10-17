import { useState } from "react";
import { useContext } from "react";
import TasksContext from "../context/task";

function TaskCreate({ task, taskFormUpdate, onUpdate }) {
  const { createTask, editTaskById } = useContext(TasksContext);

  const [title, setTitle] = useState(task ? task.title : "");
  const [desc, setDesc] = useState(task ? task.desc : "");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskFormUpdate) {
      onUpdate(task.id, title, desc);
      // editTaskById(task.id, title, desc);
    } else {
      // onCreate(title, desc);
      createTask(title, desc);
    }
    setTitle("");
    setDesc("");
  };
  return (
    <div>
      {taskFormUpdate ? (
        <div className="editDiv">
          <form className="createForm">
            <h3>Lütfen Task'ı Düzenleyiniz!</h3>
            <label className="createLabel">Başlığı düzenleyiniz!</label>
            <input
              value={title}
              onChange={handleTitleChange}
              className="createInput"
            />
            <label className="createLabel">Task'ı düzenleyiniz!</label>
            <textarea
              value={desc}
              onChange={handleDescChange}
              rows="5"
              className="createInput"
            />
            <button
              onClick={handleSubmit}
              className="createButton updateButton2"
            >
              Güncelle
            </button>
          </form>
        </div>
      ) : (
        <div className="createDiv">
          <form className="createForm">
            <h3>Lütfen Task Ekleyiniz!</h3>
            <label className="createLabel">Başlık</label>
            <input
              value={title}
              onChange={handleTitleChange}
              className="createInput"
            />
            <label className="createLabel">Task giriniz!</label>
            <textarea
              value={desc}
              onChange={handleDescChange}
              rows="5"
              className="createInput"
            />
            <button onClick={handleSubmit} className="createButton">
              Oluştur
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
export default TaskCreate;
