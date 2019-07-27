import React, { Component } from "react";
// Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class ModalUI extends Component {
  state = {
    open: this.props.isModalOpen || false
  };

  cancelClick = () => {
    this.setState({ open: falsw });
  };

  processClick = () => {

  };

  handleClose = () => {
    this.setState({ open: false });
  };    

  openModal = () => {
    this.props.openModal(() => this.setState({ open: true }))
  };


  render() {

    const { title, cancelButtonName, processButtonName } = this.props;
    // JSX
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
       { title ?  <DialogTitle id="form-dialog-title">{title}</DialogTitle> : null }
        <DialogContent>
          {this.props.children}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.cancelClick}
            color="primary"
          >
            {cancelButtonName}
          </Button>
          <Button
            onClick={this.processClick}
            color="primary"
          >
            {processButtonName}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
