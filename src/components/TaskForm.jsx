import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../services/taskService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addTask } from "../redux/TaskSlice";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";

const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      title,
      description,
      status,
    };

    createTask(newTask)
      .then((response) => {
        dispatch(addTask(response.data.task));
        // Clear form fields
        setTitle("");
        setDescription("");
        setStatus("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <div className="container  w-50">
        <Form className="my-5">
          <Row className="mb-3">
            <Form.Label column="lg" lg={2}>
              Title
            </Form.Label>
            <Col>
              <Form.Control
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                name="title"
                type="text"
                placeholder="enter title"
                autoFocus
              />
            </Col>
          </Row>
          <Row className="mb-3" controlId="UpdateTaskForm.ControlTextarea1">
            <Form.Label column="lg" lg={2}>
              description
            </Form.Label>
            <Col>
              <Form.Control
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                as="textarea"
                rows={3}
              />
            </Col>
          </Row>
          <Row className="mb-3" controlId="UpdateTaskForm.ControlTextarea1">
            <Form.Label column="lg" lg={2}>
              status
            </Form.Label>
            <Col>
              <Form.Control
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                type="text"
                placeholder="enter status"
              />
            </Col>
          </Row>
        </Form>
        <Button variant="primary" onClick={handleSubmit}>
          Add Task
        </Button>
      </div>
      <div className="my-5">
        <Link to="/">
          <Button variant="success">Show All Task</Button>
        </Link>
      </div>
    </div>
  );
};

export default TaskForm;
