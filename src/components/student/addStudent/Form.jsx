import React from 'react';
import { TextField, Button } from '@material-ui/core/';

const Form = ({ handleChange, value }) => {
    return (
        <form>
            <TextField
                id="standard-search"
                label="Name"
                type="search"
                margin="normal"
                onChange={handleChange}
                value={value}
            />

            <TextField
                id="standard-search"
                label="Email"
                type="search"
                margin="normal"
                onChange={handleChange}
                value={value}
            />

            <TextField
                id="standard-search"
                label="Student Code"
                type="search"
                margin="normal"
                onChange={handleChange}
                value={value}
            />


            <TextField
                id="standard-search"
                label="Github Username"
                type="search"
                margin="normal"
                onChange={handleChange}
                value={value}
            />

            <TextField
                id="standard-search"
                label="Search student"
                type="search"
                margin="normal"
                onChange={handleChange}
                value={value}
            />

            <Button
                variant="contained"
                color="primary">
                Add Student
            </Button>
        </form>
    );
};

export default Form;