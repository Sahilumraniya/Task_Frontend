import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { fetchTasks, deleteTask } from "../services/taskService";
import { setTasks, deleteTaskFromStore } from "../redux/TaskSlice";
import UpdateTask from "./UpdateTask";
import { Link } from "react-router-dom";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = (t) => {
    setData(() => t);
    console.log(data, t);
    handleShow();
  };

  const handleTaskDelete = (taskId) => {
    deleteTask(taskId)
      .then((response) => {
        dispatch(deleteTaskFromStore(taskId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTasks()
      .then((response) => {
        dispatch(setTasks(response.data.tasks));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, tasks]);

  return (
    <>
      <div className="my-5">
        <Link to='/add'>
          <Button variant="success">Create New Task</Button>
        </Link>
      </div>
      <div className="my-5 mx-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="w-100">
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td className="w-5">
                  <Button
                    className="mx-2 my-1"
                    variant="primary"
                    onClick={() => {
                      handleUpdate(task);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleTaskDelete(task._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <UpdateTask handleClose={handleClose} show={show} data={data} />
      </div>
    </>
  );
};

export default TaskList;
