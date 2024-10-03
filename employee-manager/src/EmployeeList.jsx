import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';

const EmployeeList = ({ employees, openEditModal, deleteEmployee }) => {
    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {employees.map(emp => (
                <Col key={emp.id}>
                    <Card>
                        <div className="image-container">
                            {emp.photo && (
                                <img
                                    src={emp.photo}
                                    alt={`${emp.name}'s photo`}
                                />
                            )}
                        </div>
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>{emp.name}</Card.Title>
                            <Card.Text>
                                <strong>Job Title:</strong> {emp.jobTitle}<br />
                                <strong>Email:</strong> {emp.email}
                            </Card.Text>
                            <div className="mt-auto">
                                <Button variant="danger" onClick={() => deleteEmployee(emp.id)} className="me-2">
                                    Delete
                                </Button>
                                <Button variant="primary" onClick={() => openEditModal(emp)}>
                                    Edit
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default EmployeeList;
