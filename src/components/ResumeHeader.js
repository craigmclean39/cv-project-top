import { Typography, Box } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const ResumeHeader = (props) => {
  const { contactInformation } = props;

  const isLarge = useMediaQuery("(min-width:600px)");

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "primary.main",
        mt: isLarge ? 2 : 1,
        minHeight: isLarge ? "80px" : "40px",
      }}
    >
      <Typography
        sx={{
          color: "primary.contrastText",
          pl: isLarge ? 2 : 1,
          pt: isLarge ? 1 : 0.5,
        }}
        variant="h4"
        component="h2"
      >{`${contactInformation._firstName}`}</Typography>
      <Typography
        sx={{
          color: "primary.contrastText",
          pb: isLarge ? 1 : 0.5,
          pl: isLarge ? 3 : 1.5,
        }}
      >
        {contactInformation._title}
      </Typography>
    </Box>
  );
};

export default ResumeHeader;
