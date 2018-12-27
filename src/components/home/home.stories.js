import React from 'react';
import { storiesOf , addDecorator } from '@storybook/react';
import Home from './Home';
// import {withInfo} from '@storybook/addon-info'

storiesOf('Home', module)
    .add('Home', () => <Home></Home>)
    