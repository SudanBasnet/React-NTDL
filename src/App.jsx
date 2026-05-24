import { Form } from "./components/Form";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Table } from "./components/Table";
import { fetchAllTasks, postTask, updateTasks } from "./helpers/axiosHelper";
const hrPerWeek = 24 * 7;

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [resp, setResp] = useState({});
  const shouldFetchRef = useRef(true);
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + Number(item.hr);
  }, 0);

  const getAllTasks = async () => {
    //call axioshelp for get data
    const data = await fetchAllTasks();

    //mount to our tasklist
    data?.status === "success" && setTaskList(data.tasks);
  };
  useEffect(() => {
    //
    shouldFetchRef.current && getAllTasks();
    shouldFetchRef.current = false;
  }, []);

  const addTaskList = async (taskObj) => {
    const response = await postTask(taskObj);
    setResp(response);
    if (response.status === "success") {
      //refetch all tasks
      getAllTasks();
    }
  };

  const switchTask = async (_id, type) => {
    const response = await updateTasks({ _id, type });
    setResp(response);
    if (response.status === "success") {
      //refetch all tasks
      getAllTasks();
    }
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
        {resp?.message && (
          <div
            className={
              resp?.status === "success"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            {resp?.message}
          </div>
        )}

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
