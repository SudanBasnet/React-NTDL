import { Form } from "./components/Form";
import "./App.css";

const App = () => {
  const addTaskList = (taskObj) => {
    console.log(taskObj);
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
