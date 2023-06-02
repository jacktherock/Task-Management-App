import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col } from 'react-bootstrap';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      setError('Error fetching tasks !', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);

      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setError('Error deleting task !', error.message);
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {

    try {
      const response = await axios.put(`/api/tasks/${taskId}`, { status: newStatus });
      const updatedTask = response.data;

      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, status: updatedTask.status };
          }
          return task;
        })
      );
    } catch (error) {
      setError('Error updating task status !', error.message);
    }
  };

  if (error) {
    return <p className="text-center bg-danger text-white py-3 rounded-4">{error}</p>;
  }

  return (
    <>
      <Row>
        {tasks.map((task) => (
          <Col className='d-flex justify-content-center align-items-center' key={task._id}>
            <Card style={{ width: "18rem" }} className="shadow border-0 rounded-4 my-3">

              <Card.Header className="border-0 rounded-4 d-flex justify-content-center justify-content-between">
                <Card.Text className="my-auto">{task.status}</Card.Text>
                {task.status !== 'Incomplete' && (
                  <Button variant="outline-warning" className="border-0 rounded-5" onClick={() => handleUpdateStatus(task._id, 'Incomplete')}>
                    <i className="bi bi-arrow-counterclockwise"></i>
                  </Button>
                )}
                {task.status !== 'Completed' && (
                  <Button variant="outline-success" className="border-0 rounded-5" onClick={() => handleUpdateStatus(task._id, 'Completed')}>
                    <i className="bi bi-check-lg"></i>
                  </Button>
                )}
                <Button variant="outline-danger" className="border-0 rounded-5" onClick={() => handleDeleteTask(task._id)}><i className="bi bi-trash-fill"></i></Button>
              </Card.Header>

              <Card.Body>
                <Card.Title className='fs-4 text-center'>{task.title}</Card.Title>
                <Card.Text className='text-center'>{task.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TaskList;
