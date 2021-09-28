import * as React from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";

import uniqid from "uniqid";

export default class CustomizeForm extends React.Component {
  render() {
    const { open, handleClose, customColors, updateColor } = this.props;

    const colorButtons = customColors.map((element) => {
      return (
        <IconButton
          key={uniqid()}
          variant="contained"
          size="large"
          onClick={updateColor(element)}
          sx={{
            backgroundColor: element[500],
            mx: 2,
            my: 2,
            border: "solid 3px black",
          }}
        ></IconButton>
      );
    });

    return (
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Customize Resume</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Select Color</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {colorButtons}
          </Box>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}
