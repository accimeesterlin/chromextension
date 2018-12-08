import React from 'react';
import { List, ListItem, IconButton, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { Delete } from '@material-ui/icons';


const ListComponent = ({ students, deleteStudent }) => {
    return (
        <List dense={false}>
            {students.map((student, i) => (
                <ListItem key = {i}>
                    <ListItemText
                        primary={student.name}
                        secondary={false ? 'Secondary text' : null}
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Delete" onClick ={() => deleteStudent(student)}>
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
};

export default ListComponent;