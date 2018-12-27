import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import Info from './info/Info';
import Form from './info/Form';
import UpcomingSession from './upcomingSession/UpcomingSession';
// import {withInfo} from '@storybook/addon-info'

storiesOf('Form', module)
  // .addDecorator(withInfo)
  .add('Form', () => <Form></Form>);

storiesOf('Tutor', module)
  // .addDecorator(withInfo)
  .add('Info', () => <Info>Test</Info>)
  .add('UpcomingSession', () => <UpcomingSession />)
