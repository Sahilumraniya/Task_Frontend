import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../services/taskService";
import { updateTask } from "../redux/TaskSlice";
import { useEffect, useState } from "react";

function UpdateTask({ handleClose, show, data }) {
  const dispatch = useDispatch();
  const [task, setTask] = useState(data);

  const handleStatusUpdate = (task) => {
    updateTaskStatus(task._id, task)
      .then((response) => {
        dispatch(
          updateTask(task)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit');
    console.log(task);
    handleStatusUpdate(task);
    handleClose();
  };

  useEffect(()=>{
    setTask(data);
  },[data]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="UpdateTaskForm.ControlInput1"
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={task.title}
                onChange={(e) => {
                  setTask({ ...task, [e.target.name]: e.target.value });
                }}
                name="title"
                type="text"
                placeholder="enter title"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="UpdateTaskForm.ControlTextarea1"
            >
              <Form.Label>description</Form.Label>
              <Form.Control
                value={task.description}
                onChange={(e) => {
                  setTask({ ...task, [e.target.name]: e.target.value });
                }}
                name="description"
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="UpdateTaskForm.ControlTextarea1"
            >
              <Form.Label>status</Form.Label>
              <Form.Control
                value={task.status}
                onChange={(e) => {
                  setTask({ ...task, [e.target.name]: e.target.value });
                }}
                name="status"
                type="text"
                placeholder="enter status"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateTask;
