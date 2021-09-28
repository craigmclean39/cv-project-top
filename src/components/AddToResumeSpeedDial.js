import { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { Backdrop, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddToResumeSpeedDial = (props) => {
  const isLarge = useMediaQuery("(min-width:600px)");

  const [open, setOpen] = useState(false);
  const {
    setContactOpen,
    setWorkOpen,
    setEducationOpen,
    setSkillsOpen,
    setCustomizeOpen,
  } = props;

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
    <Box>
      <Backdrop open={open} sx={{ zIndex: 0 }} />
      <SpeedDial
        ariaLabel="Add to Resume"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onClick={handleClickOpen}
        open={open}
        direction="down"
        sx={{
          position: "absolute",
          top: isLarge ? 80 : 65,
          left: isLarge ? 30 : 15,
          zIndex: 1,
        }}
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
        <SpeedDialAction
          key="Customize"
          icon={<ColorLensIcon />}
          tooltipTitle="Customize"
          tooltipOpen
          onClick={setCustomizeOpen}
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
