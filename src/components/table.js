import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  CircularProgress,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContentText,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";
import moment from "moment";

import AddTable from "./addTable";
import TableActions from "./tableActions";
import styles from "./table.module.css";
import {
  getAllTasks,
  getFilteredTasks,
  addTask,
  editTask,
  deleteTask,
  markComplete,
} from "./apiService";

const useStyles = makeStyles({
  container: {
    margin: "15px",
  },
  table: {
    minWidth: 650,
    padding: "12px",
    "& .MuiTableCell-root": {
      padding: "3px 5px",
    },
  },
  xsFormField: {
    "& input": {
      padding: "5px 10px !important",
      maxWidth: 100,
      "&::placeholder": {
        fontSize: "0.8rem",
      },
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-marginDense": {
      transform: "translate(14px, 8px) scale(1)",
      color: "rgba(0, 0, 0, 0.87)",
      fontWeight: 500,
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(1)",
    },
    "& .MuiInputLabel-outlined": {
      fontSize: "0.8rem",
    },
  },
  xsSelectFormField: {
    "& .MuiOutlinedInput-input": {
      padding: "5px 32px 5px 20px",
      fontSize: "0.8rem",
      fontWeight: 500,
      textAlign: "center",
    },
  },
  cell: {
    padding: "0px",
    background: "red",
  },
});

const HEADERS = [
  {
    name: "Id",
    align: "left",
    key: "id",
  },

  {
    name: "Name",
    align: "left",
    key: "name",
  },
  {
    name: "Description",
    align: "left",
    key: "description",
  },

  {
    name: "Due Date",
    align: "left",
    key: "dueDate",
  },
  {
    name: "Status",
    align: "left",
    key: "status",
  },
];

export const formModes = {
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

export const status = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
};

const Tables = () => {
  const classes = useStyles();
  const [formDetails, setFormDetails] = useState({
    isAdd: true,
    formData: {},
    isFormModalVisible: false,
    formMode: formModes.ADD,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filter, setFilter] = useState(-1);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    if (value === -1) {
      getTableData();
    } else {
      getFilterTableData(value);
    }
  };

  const handleDelete = (rowDetails) => {
    console.log("******  handleDelete rowDetails *******", rowDetails);
    setFormDetails({
      isFormModalVisible: false,
      formMode: formModes.DELETE,
      formData: rowDetails,
    });
  };

  const handleEdit = (rowDetails) => {
    console.log("******  handleEdit rowDetails *******", rowDetails);
    setFormDetails({
      isFormModalVisible: true,
      formMode: formModes.EDIT,
      formData: rowDetails,
    });
  };

  const handleAdd = () => {
    console.log("******  handleEdit rowDetails *******");
    setFormDetails({
      isFormModalVisible: true,
      formMode: formModes.ADD,
      formData: {},
    });
  };

  const handleClose = () => {
    console.log("******  handleClose rowDetails *******");
    setFormDetails({
      isFormModalVisible: false,
      formMode: formModes.ADD,
      formData: {},
    });
  };

  const handleSave = async (mode, payload) => {
    console.log("handleSave", mode, payload);
    try {
      setFormDetails({
        isFormModalVisible: false,
        mode: formModes.ADD,
        formData: {},
      });
      setIsLoading(true);
      if (mode === formModes.ADD) {
        const response = await addTask(payload);
      } else {
        const response = await editTask(payload.id, payload);
      }
      getTableData();
    } catch (error) {
      console.log("****** error ******", error);
      setIsLoading(false);
    }
  };

  const handleMarkComplete = async (rowDetails) => {
    try {
      setIsLoading(true);
      const response = await markComplete(rowDetails.id);
      getTableData();
    } catch (error) {
      console.log("****** error ******", error);
      setIsLoading(false);
    }
  };

  const handleDeleteOperation = async () => {
    console.log("handleDeleteOperation", formDetails.formData.id);
    try {
      setIsLoading(true);
      const response = await deleteTask(formDetails.formData.id);
      setFormDetails({
        isFormModalVisible: false,
        mode: formModes.ADD,
        formData: {},
      });
      getTableData();
    } catch (error) {
      console.log("****** error ******", error);
      setIsLoading(false);
    }
  };

  const getTableData = async () => {
    try {
      setIsLoading(true);
      const response = await getAllTasks();
      console.log("******* response ******", JSON.stringify(response));
      setTableData(response);
      setIsLoading(false);
    } catch (error) {
      console.log("****** error ******", error);
      // setTableData(DUMMY_DATA);
      setIsLoading(false);
    }
  };

  const getFilterTableData = async (filterId) => {
    try {
      setIsLoading(true);
      const response = await getFilteredTasks(filterId);
      console.log("******* response ******", JSON.stringify(response));
      setTableData(response);
      setIsLoading(false);
    } catch (error) {
      console.log("****** error ******", error);
      //  setTableData(DUMMY_DATA);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  // const getRowStatusColor = (rowDetails) => {
  //   if (rowDetails.status === status.COMPLETED) {
  //     return styles.completed;
  //   }
  // };

  return (
    <>
      {isLoading && <CircularProgress />}
      <div className={styles.tableContainer}>
        <div>
          <Typography
            style={{
              color: "#242f6a",
              display: "flex",
              fontSize: "20px",
              fontWeight: "600",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
            component={"span"}
          >
            <span>Task Management</span>
            <div>
              <Button
                color="primary"
                size="small"
                variant="contained"
                style={{ marginRight: "8px" }}
                onClick={handleAdd}
              >
                ADD
              </Button>
            </div>
          </Typography>
          <FormControl
            fullWidth
            variant="filled"
            sx={{ m: 2, p: 2, minWidth: 400 }}
            style={{ marginBottom: "16px", marginTop: "16px" }}
          >
            <InputLabel id="demo-select-small">Search by Due Date</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="demo-label"
              onChange={handleFilterChange}
            >
              <MenuItem value={-1}>All</MenuItem>
              <MenuItem value={0}>Today</MenuItem>
              <MenuItem value={1}>Tomorrow</MenuItem>
              <MenuItem value={2}>Overdue</MenuItem>
            </Select>
          </FormControl>
        </div>

        <TableContainer>
          <Table
            classes={{
              root: classes.table,
            }}
            aria-label="simple table"
            size="medium"
          >
            <TableHead
              style={{
                backgroundColor: "#242f6a",
              }}
            >
              <TableRow>
                {HEADERS.map((hItem) => (
                  <TableCell key={hItem.name} align={hItem.align}>
                    {hItem.component ? (
                      hItem.component
                    ) : (
                      <div style={{ maxwidth: "100%", color: "white" }}>
                        {hItem.name}
                      </div>
                    )}
                  </TableCell>
                ))}
                <TableCell style={{ color: "white" }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow
                  key={`${row.id}${index}`}
                  className={
                    row.status === status.COMPLETED
                      ? styles.completed
                      : moment() > moment(row.dueDate, "YYYY-MM-DD")
                        ? styles.overDue
                        : styles.pending
                  }
                >
                  {HEADERS.map((h) => (
                    <TableCell key={h.name} align={h.align}>
                      {row[h.key]}
                    </TableCell>
                  ))}
                  <TableActions
                    rowDetails={row}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onMarkComplete={handleMarkComplete}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {formDetails.isFormModalVisible && (
        <AddTable
          closeModal={handleClose}
          rowData={formDetails.formData}
          mode={formDetails.formMode}
          onSave={handleSave}
        />
      )}
      {formDetails.formMode === formModes.DELETE && (
        <Dialog
          open={true}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Task"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {` Are you sure you want to delete ${formDetails.formData.name}`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDeleteOperation} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
export default Tables;
