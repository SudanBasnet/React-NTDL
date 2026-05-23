import { Form } from "./components/Form";
import "./App.css";
import { useState } from "react";
import { Table } from "./components/Table";
const hrPerWeek = 24 * 7;

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + Number(item.hr);
  }, 0);
  const addTaskList = (taskObj) => {
    const obj = {
      ...taskObj,
      id: randomIdGenerator(),
      type: "entry",
    };
    setTaskList([...taskList, obj]);
    if (ttlHr + Number(taskObj.hr) > hrPerWeek) {
      return alert("Sorry, Maximum hours reached for a week");
    }
  };

  const switchTask = (id, type) => {
    setTaskList(
      taskList.map((item) => {
        if (item.id === id) {
          item.type = type;
        }
        return item;
      }),
    );
  };
  const randomIdGenerator = (length = 6) => {
    const str =
      "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

    let id = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * str.length); //0-61
      id += str[randomIndex];
    }
    return id;
  };

  const handleOnDelete = (id) => {
    if (window.confirm("are you sure,you want to delete this?"))
      setTaskList(taskList.filter((item) => item.id !== id));
  };
  return (
    <div className="wrapper pt-5">
      {/* <!-- title --> */}
      <div className="container">
        <h1 className="text-center">Not to Do List</h1>

        {/* <!-- form --> */}
        <Form addTaskList={addTaskList} />

        {/* <!-- tables --> */}
        <Table
          taskList={taskList}
          switchTask={switchTask}
          handleOnDelete={handleOnDelete}
        />

        <div className="alert alert-success">
          Total Hours allocated = <span id="ttlhrs">{ttlHr}</span>hrs
        </div>
      </div>
    </div>
  );
};

export default App;
