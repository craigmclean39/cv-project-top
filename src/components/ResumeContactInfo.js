import React from "react";
import { Typography, Box } from "@mui/material";
import PhoneAndroidSharpIcon from "@mui/icons-material/PhoneAndroidSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import HttpSharpIcon from "@mui/icons-material/HttpSharp";

import ContactField from "./ContactField";

export default class ResumeContactInfo extends React.Component {
  render() {
    const { contactInformation } = this.props;

    return (
      <Box
        sx={{
          boxSizing: "border-box",
          m: 1,
        }}
      >
        <Typography variant="button" variantMapping="h4">
          Contact
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 1,
          }}
        >
          <ContactField
            icon={PhoneAndroidSharpIcon}
            data={contactInformation._phoneNumber}
          />
          <ContactField
            icon={EmailSharpIcon}
            data={contactInformation._email}
          />
          <ContactField
            icon={HttpSharpIcon}
            data={contactInformation._website}
          />
        </Box>
      </Box>
    );
  }
}
