import { Typography, Box } from "@mui/material";
import React from "react";

const ResumeHeader = (props) => {
  const { contactInformation } = props;

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "primary.dark",
        mt: 2,
        minHeight: "80px",
      }}
    >
      <Typography
        sx={{
          color: "primary.contrastText",
          pl: 2,
          pt: 1,
        }}
        variant="h4"
        component="h2"
      >{`${contactInformation._firstName} ${contactInformation._lastName}`}</Typography>
      <Typography
        sx={{
          color: "primary.contrastText",
          pb: 1,
          pl: 3,
        }}
      >
        {contactInformation._title}
      </Typography>
    </Box>
  );
};

export default ResumeHeader;
