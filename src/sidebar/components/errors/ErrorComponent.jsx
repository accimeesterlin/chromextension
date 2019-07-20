import React, { Component } from 'react';
import { connect } from 'react-redux';
import RangeErrors from './RangeErrors';
import PermissionErrors from './PermissionErrors';
import ColumnErrors from './ColumnErrors';

class ErrorComponentUI extends Component {


    generateErrors = () => {
        const message = this.props.match.params.message.toLowerCase();

        if (message.includes('permission')) {
            return <PermissionErrors message={message} />
        }

        if (message.includes('column')) {
            return <ColumnErrors message={message} />;
        }
        return <RangeErrors message={message} />;
        
    };

    render() {
        return (
            <div>
                {this.generateErrors()}
            </div>
        );
    }
}

const mapStateToProps = () => {

    return {

    };
};


const mapDispatchToProps = () => {

    return {

    };
};
const ErrorComponent = connect(mapStateToProps, mapDispatchToProps)(ErrorComponentUI);
export default ErrorComponent;