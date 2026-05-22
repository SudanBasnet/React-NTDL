import { Form } from "./components/Form";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const addTaskList = (taskObj) => {
    const obj = {
      ...taskObj,
      id: randomIdGenerator(),
      type: "entry",
    };
    setTaskList([...taskList, obj]);
  };
  console.log(taskList);
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

  return (
    <div className="wrapper pt-5">
      {/* <!-- title --> */}
      <div className="container">
        <h1 className="text-center">Not to Do List</h1>

        {/* <!-- form --> */}
        <Form addTaskList={addTaskList} />

        {/* <!-- tables --> */}
        <div className="row mt-5">
          <div className="col-md">
            <h3 className="text-center">Entry List</h3>
            <hr />
            {/* <!-- entry list tables --> */}
            <table className="table table-striped table-hover border">
              <tbody id="entryList"></tbody>
            </table>
          </div>
          <div className="col-md">
            <h3 className="text-center">Bad List</h3>
            <hr />
            {/* <!-- bad list tables --> */}
            <table className="table table-striped table-hover border">
              <tbody id="badList"></tbody>
            </table>
            <div className="alert alert-success">
              You could have saved = <span id="savedhrsElm"></span>hr
            </div>
          </div>
        </div>
        <div className="alert alert-success">
          Total Hours allocated = <span id="ttlhrs">0</span>hrs
        </div>
      </div>
    </div>
  );
};

export default App;
