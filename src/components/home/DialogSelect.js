import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'; import { FileCopy } from '@material-ui/icons';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class DialogSelect extends React.Component {
    state = {
        open: false,
        age: '',
        back2Back: '',
        noShow: ''
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {

        this.setState({ open: false });
        navigator.clipboard.writeText(`
        1.Class Code: ${this.props.classCode}
        2.Student Name: ${this.props.studentName}
        3.B2B-${this.state.back2Back}
        4.No-Show: ${this.state.noShow}

        `).then(() => {

            }

            , () => alert('fail fail fail'));

    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <FileCopy className="fileCopy" onClick={this.handleClickOpen} />
                <Dialog
                    fullScreen
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>ADP Notes</DialogTitle>
                    <DialogContent>
                        <p>1.Class Code: {this.props.classCode}</p>
                        <p>2.Student Name: {this.props.studentName}</p>
                        <p>3.B2B-{this.state.back2Back}</p>
                        <p>4.No-Show: {this.state.noShow}</p>
                    </DialogContent>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">B2B</InputLabel>
                                <Select
                                    native
                                    value={this.state.back2Back}
                                    onChange={this.handleChange('back2Back')}
                                    input={<Input id="age-native-simple" />}
                                >
                                    <option value="" />
                                    <option value={'No'}>No</option>
                                    <option value={'Yes'}>Yes</option>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-simple">No Show</InputLabel>
                                <Select
                                    value={this.state.noShow}
                                    onChange={this.handleChange('noShow')}
                                    input={<Input id="age-simple" />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'No'}>No</MenuItem>
                                    <MenuItem value={'Yes'}>Yes</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button>
                            <FileCopy className="fileCopy" onClick={this.handleClose} />
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

DialogSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogSelect);