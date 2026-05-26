import { Form } from "./components/Form";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Table } from "./components/Table";
import {
  deleteTasks,
  fetchAllTasks,
  postTask,
  updateTasks,
} from "./helpers/axiosHelper";
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
  const [toDelete, setToDelete] = useState([]);
  const entryList = taskList.filter((item) => item.type === "entry");
  const badList = taskList.filter((item) => item.type === "bad");
  useEffect(() => {
    //
    shouldFetchRef.current && getAllTasks();
    shouldFetchRef.current = false;
  }, []);

  const addTaskList = async (taskObj) => {
    if (ttlHr + Number(taskObj.hr) > hrPerWeek) {
      return alert("Sorry not enough time to fit in the total hours you want");
    }
    const response = await postTask(taskObj);
    console.log(response);
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

  const handleOnDelete = async (idsToDelete) => {
    if (window.confirm("are you sure,you want to delete this?")) {
      const response = await deleteTasks(idsToDelete);
      setResp(response);
      if (response.status === "success") {
        //refetch all tasks
        getAllTasks();
      }
    }
  };
  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    let tempArg = [];
    if (value === "allEntry") {
      tempArg = entryList;
    }
    if (value === "allBad") {
      tempArg = badList;
    }
    if (checked) {
      if (value === "allEntry" || value === "allBad") {
        //get all ids from entry list
        const _ids = tempArg.map((item) => item._id);
        const uniqueIds = [...new Set([...toDelete, ..._ids])];
        setToDelete(uniqueIds);
        return;
      }
      setToDelete([...toDelete, value]);
    } else {
      if (value === "allEntry" || value === "allBad") {
        const _ids = tempArg.map((item) => item._id);

        setToDelete(toDelete.filter((_id) => !_ids.includes(_id)));
        return;
      }

      setToDelete(toDelete.filter((_id) => _id !== value));
    }
    console.log(checked, value);
  };
  console.log(toDelete);
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
          toDelete={toDelete}
          handleOnSelect={handleOnSelect}
          entryList={entryList}
          badList={badList}
        />

        <div className="alert alert-success">
          Total Hours allocated = <span id="ttlhrs">{ttlHr}</span>hrs
        </div>
      </div>
    </div>
  );
};

export default App;
