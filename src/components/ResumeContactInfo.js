import React from "react";
import { Typography, Box } from "@mui/material";
import PhoneAndroidSharpIcon from "@mui/icons-material/PhoneAndroidSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import ComputerSharpIcon from "@mui/icons-material/ComputerSharp";

import ContactField from "./ContactField";

const ResumeContactInfo = (props) => {
  const { contactInformation } = props;

  let contactFields = [];
  if (contactInformation._phoneNumber !== "") {
    contactFields.push(
      <ContactField
        icon={PhoneAndroidSharpIcon}
        data={contactInformation._phoneNumber}
      />
    );
  }

  if (contactInformation._email !== "") {
    contactFields.push(
      <ContactField icon={EmailSharpIcon} data={contactInformation._email} />
    );
  }

  if (contactInformation._website !== "") {
    contactFields.push(
      <ContactField
        icon={ComputerSharpIcon}
        data={contactInformation._website}
      />
    );
  }

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        m: 1,
      }}
    >
      <Typography variant="button">Contact</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 1,
        }}
      >
        {contactFields}
      </Box>
    </Box>
  );
};

export default ResumeContactInfo;
