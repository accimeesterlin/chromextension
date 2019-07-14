import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  Home,
  CalendarToday,
  Add, Delete, Info
} from '@material-ui/icons';
import Search from './Search';
import { TextField, Button } from '@material-ui/core/';
import CheckMark from './CheckMark';
import Loading from './Loading/Loading';
import Title from './Title/Title';

export const actionsTextField = {
  onChange: action('onHandleChange')
};

export const actionsButton = {
  onClick: action('handleSubmit')
};


storiesOf('Atoms', module)
  // From Material UI
  .add('Home Icon', () => < Home />)
  .add('Add Student Icon', () => < Add />)
  .add('Delete Student Icon', () => < Delete />)
  .add('Info Icon', () => < Info />)
  .add('Calender Icon', () => (< CalendarToday />))
  .add('Search Input', () => < Search />)
 
  .add('TextField', () => (
    <TextField
      id="standard-search"
      label="Name"
      type="search"
      name="name"
      margin="normal"
      {...actionsTextField}
      value={'Awesome Student'}
    />
  ))
  .add('Button', () => (
    <Button
      variant="contained"
      {...actionsButton}
      color="primary">
      Add Student
  </Button>
  ))
  .add('CheckMark', () => <CheckMark/>)
  .add('Loading', () => <Loading/>)
  .add('Title', () => <Title/>)