import { useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import EditContactForm from "./EditContactForm";

const AddDataButtons = (props) => {
  const [open, setOpen] = useState(false);
  const { resume, updateContactInfo } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        m: 1,
      }}
    >
      <Button variant="contained" onClick={handleClickOpen}>
        Edit Contact Details
      </Button>
      <EditContactForm
        open={open}
        handleClose={handleClose}
        contactInformation={resume._contactInformation}
        updateContactInfo={updateContactInfo}
      />
    </Box>
  );
};

export default AddDataButtons;
