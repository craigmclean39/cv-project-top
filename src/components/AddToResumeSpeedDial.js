import { useState } from "react";
import { Box } from "@mui/system";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";

const AddToResumeSpeedDial = (props) => {
  const [open, setOpen] = useState(false);
  const { setContactOpen, setWorkOpen, setEducationOpen, setSkillsOpen } =
    props;

  const handleClickOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  // Don't Close the SpeedDial if the mouse leaves, I don't like that user experience
  const handleClose = (e, reason) => {
    if (reason !== "mouseLeave") {
      setOpen(false);
    }
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
          onClick={setContactOpen}
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
          onClick={setWorkOpen}
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
          onClick={setEducationOpen}
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
          onClick={setSkillsOpen}
          tooltipPlacement="right"
          sx={{
            "& .MuiSpeedDialAction-staticTooltipLabel": {
              width: "max-content",
            },
          }}
        />
      </SpeedDial>
    </Box>
  );
};

export default AddToResumeSpeedDial;
