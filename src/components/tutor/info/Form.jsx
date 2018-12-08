import React from 'react';
import { TextField, Button } from '@material-ui/core/';

const Form = ({ handleChange, handleSubmit, tutorName, googleSheetUrl, rosterName }) => {
    return (
        <form onSubmit={handleSubmit}>  
            <TextField
                id="standard-search"
                label="Tutor Name"
                type="search"
                name="tutorName"
                margin="normal"
                onChange={handleChange}
                value={tutorName}
            />


            <TextField
                id="standard-search"
                label="Roster Name"
                type="search"
                name="rosterName"
                margin="normal"
                onChange={handleChange}
                value={rosterName}
            />
            
            <TextField
                id="standard-search"
                label="Google Sheet URL"
                type="search"
                name="googleSheetUrl"
                margin="normal"
                onChange={handleChange}
                value={googleSheetUrl}
            />

            <Button
                variant="contained"
                onClick={handleSubmit}
                color="primary">
                Submit
            </Button>
        </form>
    );
};

export default Form;