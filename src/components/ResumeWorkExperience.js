import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useMediaQuery from "@mui/material/useMediaQuery";

const ResumeWorkExperience = (props) => {
  const { workExperience, editWorkInfo, deleteWorkInfo } = props;
  const isLarge = useMediaQuery("(min-width:600px)");

  const iconSize = isLarge ? "16px" : "8px";
  const lineHeight = isLarge ? "24px" : "12px";
  const fontSize = isLarge ? "14px" : "7px";
  const iconLineHeight = isLarge ? "21.98px" : "10.99px";

  return (
    <Box
      sx={{
        m: isLarge ? 2 : 1,
        mr: 2,
        mt: 0,
        lineHeight: lineHeight,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          lineHeight: lineHeight,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ mb: isLarge ? -0.5 : -1 }}
          color="info.dark"
        >
          {workExperience._jobTitle}
        </Typography>
        <Box
          data-html2canvas-ignore="true"
          sx={{
            p: 0,
            fontSize: fontSize,
            mb: isLarge ? -0.5 : -1,
            lineHeight: iconLineHeight,
          }}
        >
          <IconButton
            aria-label="edit"
            onClick={editWorkInfo(workExperience._id)}
            sx={{
              width: iconSize,
              height: iconSize,
              p: 0,
              ml: isLarge ? 1 : 0.5,
            }}
          >
            <EditIcon
              sx={{ color: "common.black", width: iconSize, height: iconSize }}
            />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={deleteWorkInfo(workExperience._id)}
            sx={{
              width: iconSize,
              height: iconSize,
              mx: isLarge ? 0.5 : 0.25,
              p: 0,
            }}
          >
            <DeleteIcon
              sx={{ color: "common.black", width: iconSize, height: iconSize }}
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
          lineHeight: lineHeight,
        }}
      >
        <Typography variant="caption">{`${workExperience._startDate} - ${workExperience._endDate}`}</Typography>
        <Typography variant="caption">{workExperience._location}</Typography>
      </Box>
      <Typography variant="caption">{workExperience._description}</Typography>
    </Box>
  );
};

export default ResumeWorkExperience;
