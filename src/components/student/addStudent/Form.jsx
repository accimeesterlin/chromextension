import React from 'react';
import { TextField, Button } from '@material-ui/core/';

const Form = ({ handleChange, handleSubmit, name, githubUsername, email, studentCode }) => {
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                id="standard-search"
                label="Name"
                type="search"
                name="name"
                margin="normal"
                onChange={handleChange}
                value={name}
            />

            <TextField
                id="standard-search"
                label="Email"
                name="email"
                type="email"
                margin="normal"
                onChange={handleChange}
                value={email}
            />

            <TextField
                id="standard-search"
                label="Student Code"
                type="search"
                name="studentCode"
                margin="normal"
                onChange={handleChange}
                value={studentCode}
            />


            <TextField
                id="standard-search"
                label="Github Username"
                type="search"
                name="githubUsername"
                margin="normal"
                onChange={handleChange}
                value={githubUsername}
            />

            <Button
                variant="contained"
                onClick={handleSubmit}
                color="primary">
                Add Student
            </Button>
        </form>
    );
};

export default Form;