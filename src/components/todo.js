import React, { useState, useEffect } from "react";

export default function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
      if(localStorage.getItem("localTasks")){
          const storedList = JSON.parse(localStorage.getItem("localTasks"));
          setTasks(storedList);
      }
  },[])

  const addTask = (e) => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };

  const handleDelete = (task)=>{
      const deleted = tasks.filter((t)=>t.id !== task.id);
      setTasks(deleted);
      localStorage.setItem("localTasks", JSON.stringify(deleted))
  }

  const handleClear=()=>{
      setTasks([]);
      localStorage.removeItem("localTasks");
  }
  return (
    <div className="container row">
      <h3 className="mt-3 text-secondary">ToDo App</h3>
      <div className="col-8">
        <input
          name="task"
          type="text"
          value={task}
          placeholder="please enter..."
          className="form-control"
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="col-4">
        <button
          className="btn btn-success"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <div className="badge">
        You have
        {!tasks.length
          ? " no tasks"
          : tasks.length === 1
          ? " 1 task"
          : tasks.length > 1
          ? ` ${tasks.length} tasks`
          : null}
      </div>
      {tasks.map((task) => (
        <React.Fragment key={task.id}>
            <div className="col-11">
                <span className = "form-control bg-white btn mt-2"
                style={{textAlign: "left", fontWeight: "bold"}}>
                    {task.title}
                </span>
            </div>

            <div className="col-1">
                <button
                className ="btn btn-danger"
                onClick ={()=> handleDelete(task)}
                >delete</button>
            </div>
        </React.Fragment>
      ))}
      {!tasks.length ? null:(
          <div>
              <button className= "btn btn-info" onClick={()=>handleClear()}>
              Clear Completed
              </button>
          </div>
      )}
    </div>
  );
}
