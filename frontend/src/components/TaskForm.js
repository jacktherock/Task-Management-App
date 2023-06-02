import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Incomplete');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            setError('Title is required !');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        const newTask = {
            title,
            description,
            status,
        };

        axios.post('/api/tasks', newTask).then(
            response => {
                setTitle('');
                setDescription('');
                setStatus('Incomplete');
                setSuccessMessage(response.data);
                setTimeout(() => {
                    setSuccessMessage('');
                }, 2000);
            }
        ).catch(error => {
            setError('Error during request !' + error);
            setTimeout(() => {
                setError('');
            }, 2000);
        });
    };

    return (
        <div >
            <Form onSubmit={handleSubmit} className="shadow py-3 px-3 rounded-4" >
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control className='rounded-3' placeholder="Write Title of task" type="text" value={title} onChange={handleTitleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control className='rounded-3' placeholder="Write Description of task" as="textarea" rows={3} value={description} onChange={handleDescriptionChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Select value={status} className='rounded-3' onChange={handleStatusChange}>
                        <option value="Incomplete">Incomplete</option>
                        <option value="Complete">Complete</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" className='rounded-4' type="submit">
                    Add Task
                </Button>

            </Form>

            {error && <p className="text-center bg-danger text-white py-3 rounded-4 my-4">{error}</p>}
            {successMessage && <p className="text-center bg-success text-white py-3 rounded-4 my-4">{successMessage}</p>}

        </div>
    );
};

export default TaskForm;
