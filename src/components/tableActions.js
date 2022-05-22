import React from "react";
import {
  TableCell,
  Button,
  Grid,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { status } from "./table";

const TableActions = ({ rowDetails, onDelete, onEdit, onMarkComplete }) => {
  return (
    <TableCell>
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        wrap="nowrap"
      >
        <Stack direction="row" spacing={2}>
          {rowDetails.status === status.PENDING && (
            <Button
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => onMarkComplete(rowDetails)}
            >
              Mark as complete
            </Button>
          )}

          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={() => onEdit(rowDetails)}
          >
            Edit
          </Button>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={() => onDelete(rowDetails)}
          >
            Delete
          </Button>
        </Stack>
      </Grid>
    </TableCell>
  );
};

export default TableActions;
