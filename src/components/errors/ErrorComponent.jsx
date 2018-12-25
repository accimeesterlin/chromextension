import React, { Component } from 'react';
import Nav from '../../common/nav/Nav';
import { connectWithStore } from '../../store/index';
import RangeErrors from './RangeErrors';
import PermissionErrors from './PermissionErrors';
import ColumnErrors from './ColumnErrors';


class ErrorComponentUI extends Component {

    generateErrors = () => {
        const message = this.props.message;

        if (message.includes('permission')) {
            return <PermissionErrors message={message} />
        }

        if (message.includes('import')) {
            return <ColumnErrors message={message} />;
        }

        return <RangeErrors message={message} />;
    };

    navigate = (link) => {
        console.log('Link: ', link);
        return this.props.history.push(link);
    }


    render() {
        return (
            <div className="errors">
                <Nav navigate={this.navigate} />

                {this.generateErrors()}
            </div>
        );
    }
}

const ErrorComponent = connectWithStore(ErrorComponentUI);
export default ErrorComponent;