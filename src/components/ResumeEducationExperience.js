import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ResumeEducationExperience = (props) => {
  const { educationExperience } = props;

  return (
    <Box
      sx={{
        m: 2,
        mt: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Typography variant="subtitle2" sx={{ mb: -0.5 }} color="info.dark">
          {educationExperience._educationTitle}
        </Typography>
        <Box data-html2canvas-ignore="true" sx={{ lineHeight: 0 }}>
          <IconButton
            aria-label="edit"
            sx={{ width: "16px", height: "16px", ml: 1 }}
          >
            <EditIcon
              sx={{ color: "common.black", width: "16px", height: "16px" }}
            />
          </IconButton>
          <IconButton
            aria-label="delete"
            sx={{ width: "16px", height: "16px", mx: 0.5 }}
          >
            <DeleteIcon
              sx={{ color: "common.black", width: "16px", height: "16px" }}
            />
          </IconButton>
        </Box>
      </Box>

      <Typography variant="caption">{educationExperience._orgName}</Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption">{`${educationExperience.startDate} - ${educationExperience.endDate}`}</Typography>
        <Typography variant="caption">
          {educationExperience._location}
        </Typography>
      </Box>
      <Typography variant="caption">
        {educationExperience._description}
      </Typography>
    </Box>
  );
};

export default ResumeEducationExperience;
