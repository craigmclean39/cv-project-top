import { Typography, Box } from "@mui/material";
import React from "react";

export default class ResumeHeader extends React.Component {
  render() {
    const { contactInformation } = this.props;

    return (
      <Box
        sx={{
          width: "100%",
          bgcolor: "primary.dark",
          mt: 2,
        }}
      >
        <Typography
          sx={{
            color: "text.primary",
            pl: 2,
            pt: 1,
          }}
          variant="h4"
          variantMapping="h2"
        >{`${contactInformation._firstName} ${contactInformation._lastName}`}</Typography>
        <Typography
          sx={{
            color: "text.secondary",
            pb: 1,
            pl: 3,
          }}
        >
          {contactInformation._title}
        </Typography>
      </Box>
    );
  }
}
