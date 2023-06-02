import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Task = () => {
    return (
        <Container fluid className="px-4">
            <p className='text-center fs-2 my-3 text-warning fw-bold'>Task Management App</p>
            <Row>
                <Col sm={6} >
                    <TaskForm />
                </Col>
                <Col sm={6}>
                    <TaskList />
                </Col>
            </Row>
        </Container>
    )
}

export default Task