import { useState } from "react";
import { Box } from "@mui/system";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import EditContactForm from "./EditContactForm";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";

const AddDataButtons = (props) => {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { resume, updateContactInfo } = props;

  const handleClickOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleClose = (e, reason) => {
    if (reason !== "mouseLeave") {
      setOpen(false);
    }
  };

  const openEditContactInformationDialog = () => {
    setContactOpen(true);
    setOpen(false);
  };

  const handleContactClose = () => {
    setOpen(false);
    setContactOpen(false);
  };

  return (
    <Box
      sx={{
        width: "200px",
        transform: "translateZ(0px)",
        flexGrow: 1,
      }}
    >
      <SpeedDial
        ariaLabel="Add to Resume"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onClick={handleClickOpen}
        open={open}
        direction="down"
        sx={{ position: "absolute", top: 16, left: 16 }}
      >
        <SpeedDialAction
          key="Contact Information"
          icon={<PersonIcon />}
          tooltipTitle="Contact Information"
          tooltipOpen
          onClick={openEditContactInformationDialog}
          tooltipPlacement="right"
          sx={{
            "& .MuiSpeedDialAction-staticTooltipLabel": {
              width: "max-content",
            },
          }}
        />
        <SpeedDialAction
          key="Work Experience"
          icon={<WorkIcon />}
          tooltipTitle="Work Experience"
          tooltipOpen
          onClick={handleClose}
          tooltipPlacement="right"
          sx={{
            "& .MuiSpeedDialAction-staticTooltipLabel": {
              width: "max-content",
            },
          }}
        />
        <SpeedDialAction
          key="Education"
          icon={<SchoolIcon />}
          tooltipTitle="Education"
          tooltipOpen
          onClick={handleClose}
          tooltipPlacement="right"
          sx={{
            "& .MuiSpeedDialAction-staticTooltipLabel": {
              width: "max-content",
            },
          }}
        />
        <SpeedDialAction
          key="Skills"
          icon={<BuildIcon />}
          tooltipTitle="Skills"
          tooltipOpen
          onClick={handleClose}
          tooltipPlacement="right"
          sx={{
            "& .MuiSpeedDialAction-staticTooltipLabel": {
              width: "max-content",
            },
          }}
        />
      </SpeedDial>
      <EditContactForm
        open={contactOpen}
        handleClose={handleContactClose}
        contactInformation={resume._contactInformation}
        updateContactInfo={updateContactInfo}
      />
    </Box>
  );
};

export default AddDataButtons;
