import { useState } from "react";
import { Box } from "@mui/system";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import EditContactForm from "./EditContactForm";
import EditWorkExpForm from "./EditWorkExpForm";
import EditSkillsForm from "./EditSkillsForm";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";

const AddToResumeSpeedDial = (props) => {
  const [open, setOpen] = useState(false);
  const {
    setContactOpen,
    handleContactClose,
    openEditContactInformationDialog,
  } = props;
  const [workOpen, setWorkOpen] = useState(false);
  const [workMode, setWorkMode] = useState("work");
  const [skillsOpen, setSkillsOpen] = useState(false);
  const {
    resume,
    updateContactInfo,
    updateWorkInfo,
    updateEducationInfo,
    updateSkills,
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

  const openEditWorkExpDialog = () => {
    setWorkMode("work");
    setWorkOpen(true);
    setOpen(false);
  };

  const openEditEducationExpDialog = () => {
    setWorkMode("education");
    setWorkOpen(true);
    setOpen(false);
  };

  const handleWorkClose = () => {
    setOpen(false);
    setWorkOpen(false);
  };

  const handleSkillsClose = () => {
    setOpen(false);
    setSkillsOpen(false);
  };

  const openSkillsDialog = () => {
    setSkillsOpen(true);
    setOpen(false);
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
          onClick={openEditWorkExpDialog}
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
          onClick={openEditEducationExpDialog}
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
          onClick={openSkillsDialog}
          tooltipPlacement="right"
          sx={{
            "& .MuiSpeedDialAction-staticTooltipLabel": {
              width: "max-content",
            },
          }}
        />
      </SpeedDial>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <EditWorkExpForm
          open={workOpen}
          handleClose={handleWorkClose}
          workHistory={resume._workHistory}
          educationHistory={resume._educationHistory}
          updateWorkInfo={updateWorkInfo}
          updateEducationInfo={updateEducationInfo}
          workMode={workMode}
        />
        <EditSkillsForm
          open={skillsOpen}
          handleClose={handleSkillsClose}
          skills={resume._skills}
          updateSkills={updateSkills}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default AddToResumeSpeedDial;
