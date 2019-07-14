import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import Home from './Home';
import AddStudent from './AddStudent';
import DeleteStudent from './DeleteStudent';
import Form from './AddStudent/Form';

storiesOf('Molecules', module)
  .add('Home', () => < Home />)
  .add('AddStudent', () => < AddStudent />)
  .add('DeleteStudent', () => < DeleteStudent />)
  .add('Form', () => < Form />)

