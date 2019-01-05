import React, { Component } from 'react';
import { Snackbar } from '@material-ui/core';
import SnackBarContent from '../atoms/SnackContent';

export default class CustomizedSnackbars extends Component {

    render() {
        const { status, message, handleClose, open } = this.props;
        return (
            <Snackbar
                className='snackbar'
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={2506000}
                onClose={handleClose}
            >
                <SnackBarContent
                    onClose={handleClose}
                    variant={status}
                    message={message}
                />
            </Snackbar>
        )
    }
}


