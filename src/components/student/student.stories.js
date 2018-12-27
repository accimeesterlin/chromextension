import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import AddStudent from './addStudent/AddStudent'
import DeleteStudent from './deleteStudent/DeleteStudent';
// import { withInfo } from '@storybook/addon-info';


storiesOf('Student', module)
  // .addDecorator(withInfo)
  .add('AddStudent', () => <AddStudent></AddStudent>)
  .add('DeleteStudent', () => <DeleteStudent></DeleteStudent>);