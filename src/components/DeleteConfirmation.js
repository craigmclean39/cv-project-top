import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const DeleteConfirmation = (props) => {
  const { handleClose, deleteWork, deleteEducation, open, deleteMode } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure you want to delete?</DialogTitle>
      <DialogContent>
        <form>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              onClick={deleteMode === "work" ? deleteWork : deleteEducation}
            >
              Delete
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmation;
