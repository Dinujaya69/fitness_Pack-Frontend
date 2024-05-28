import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DeleteUserDialog = ({ open, onClose, onConfirm }) => {
  const handleConfirmAndRefresh = () => {
    onConfirm();
    window.location.reload(); // Reload the page after confirmation
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Delete User"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>{" "}
        <Button onClick={handleConfirmAndRefresh} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;
