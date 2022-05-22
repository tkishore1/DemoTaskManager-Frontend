import React from "react";
import {
  TextField,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

import customStyles from "./table.module.css";
import { formModes } from "./table";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const AddTable = ({ rowData, mode, closeModal, onSave }) => {
  const [formData, setFormData] = useState({
    id: mode === formModes.ADD ? "" : rowData.id,
    name: mode === formModes.ADD ? "" : rowData.name,
    description: mode === formModes.ADD ? "" : rowData.description,
    dueDate:
      mode === formModes.ADD
        ? new Date()
        : new Date(moment(rowData.dueDate).format("YYYY-MM-DD")),
  });

  const handleData = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const payload = { ...formData };
    payload.dueDate = moment(formData.dueDate).format("YYYY-MM-DD");
    onSave(mode, payload);
  };

  return (
    <Dialog open={true} onClose={closeModal} fullWidth={true}>
      <DialogTitle id="customized-dialog-title" onClose={closeModal}>
        Add Task
      </DialogTitle>
      <DialogContent style={{ padding: "2rem" }} dividers>
        <div>
          <div className={customStyles.inputContainer}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Name"
              onChange={(event) => handleData("name", event.target.value)}
              value={formData.name}
            />
          </div>
          <div className={customStyles.inputContainer}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Description"
              onChange={(event) =>
                handleData("description", event.target.value)
              }
              value={formData.description}
            />
          </div>
          {/* <div className={customStyles.inputContainer}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Due Date"
              onChange={handleData}
              value={formData.date}
            />
          </div> */}
          <div className={customStyles.inputContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disablePast
                margin="normal"
                id="date-picker-dialog"
                label="Available Date"
                format="yyyy-MM-dd"
                value={formData.dueDate}
                onChange={(value) => handleData("dueDate", value)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeModal} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          className="mr-12 ml-8"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddTable;
