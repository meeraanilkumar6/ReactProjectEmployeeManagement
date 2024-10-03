import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EmployeeForm = ({ show, handleClose, addEmployee, editEmployee, currentEmployee }) => {
    const [name, setName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        if (currentEmployee) {
            setName(currentEmployee.name);
            setJobTitle(currentEmployee.jobTitle);
            setEmail(currentEmployee.email);
            setPhoto(currentEmployee.photo);
        }
    }, [currentEmployee]);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result); // Set the base64 string as the photo URL
        };
        if (file) {
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const employee = { 
            id: currentEmployee ? currentEmployee.id : Date.now(), 
            name, 
            jobTitle, 
            email, 
            photo 
        };
        if (currentEmployee) {
            editEmployee(employee);
        } else {
            addEmployee(employee);
        }
        // Reset form fields
        setName('');
        setJobTitle('');
        setEmail('');
        setPhoto('');
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{currentEmployee ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formJobTitle">
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={jobTitle} 
                            onChange={(e) => setJobTitle(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhoto">
                        <Form.Label>Photo</Form.Label>
                        <Form.Control 
                            type="file" 
                            accept="image/*" 
                            onChange={handlePhotoUpload} 
                        />
                    </Form.Group>
                    {photo && (
                        <img 
                            src={photo} 
                            alt="Preview" 
                            style={{ width: '100%', marginTop: '10px' }} 
                        />
                    )}
                    <Button variant="primary" type="submit" className="mt-3">
                        {currentEmployee ? 'Save Changes' : 'Add Employee'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EmployeeForm;
