import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ResumeWorkExperience = (props) => {
  const { workExperience } = props;

  return (
    <Box
      sx={{
        m: 2,
        mt: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Typography variant="subtitle2" color="info.dark" sx={{ mb: -0.5 }}>
          {workExperience._jobTitle}
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
      <Typography variant="caption">{workExperience._orgName}</Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption">{`${workExperience.startDate} - ${workExperience.endDate}`}</Typography>
        <Typography variant="caption">{workExperience._location}</Typography>
      </Box>
      <Typography variant="caption">{workExperience._description}</Typography>
    </Box>
  );
};

export default ResumeWorkExperience;
