import React from 'react';
import { List, ListItem, IconButton, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import _ from 'lodash';


const ListComponent = ({ students, deleteStudent }) => {
    return (
        <List dense={false}>
            {_.isEmpty(students) ? <Typography>No students</Typography> : students.map((student, i) => (
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