import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

const EmployeeFilter = ({ filter, setFilter }) => (
    <InputGroup className="mb-3">
        <InputGroup.Text>Filter by Name</InputGroup.Text>
        <FormControl
            placeholder="Enter name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />
    </InputGroup>
);

export default EmployeeFilter;
