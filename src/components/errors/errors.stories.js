import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorComponent from './ErrorComponent';
import ColumnErrors from './ColumnErrors';
import PermissionErrors from './PermissionErrors';
import RangeErrors from './RangeErrors';

storiesOf('ErrorComponents', module)
    .add('ColumnErrors', () => <ColumnErrors></ColumnErrors>)
    .add('PermissionErrors ', () => <PermissionErrors></PermissionErrors>)
    .add('RangeErrors', () => <RangeErrors></RangeErrors>)