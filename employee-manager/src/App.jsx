import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import EmployeeForm from './EmployeeForm';
import EmployeeFilter from './EmployeeFilter';
import EmployeeList from './EmployeeList';

const App = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
    }, []);

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

    const addEmployee = (employee) => {
        setEmployees([...employees, employee]);
    };

    const deleteEmployee = (id) => {
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    const openEditModal = (employee) => {
        setCurrentEmployee(employee);
        setShowModal(true);
    };

    const editEmployee = (updatedEmployee) => {
        setEmployees(employees.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
        setShowModal(false);
        setCurrentEmployee(null);
    };

    const filteredEmployees = employees.filter(emp => emp.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <Container>
            <h1>Employee Manager</h1>
            <EmployeeFilter filter={filter} setFilter={setFilter} />
            <Button onClick={() => setShowModal(true)}>Add Employee</Button>
            <EmployeeList 
                employees={filteredEmployees} 
                openEditModal={openEditModal} 
                deleteEmployee={deleteEmployee} 
            />
            <EmployeeForm 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                addEmployee={addEmployee} 
                editEmployee={editEmployee} 
                currentEmployee={currentEmployee} 
            />
        </Container>
    );
};

export default App;
