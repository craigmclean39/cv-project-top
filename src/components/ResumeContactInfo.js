import React from "react";
import { Typography, Box } from "@mui/material";
import PhoneAndroidSharpIcon from "@mui/icons-material/PhoneAndroidSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import ComputerSharpIcon from "@mui/icons-material/ComputerSharp";
import ContactField from "./ContactField";
import uniqid from "uniqid";

const ResumeContactInfo = (props) => {
  const { contactInformation } = props;

  let contactFields = [];
  if (contactInformation._phoneNumber !== "") {
    contactFields.push(
      <ContactField
        key={uniqid()}
        icon={PhoneAndroidSharpIcon}
        data={contactInformation._phoneNumber}
      />
    );
  }

  if (contactInformation._email !== "") {
    contactFields.push(
      <ContactField
        key={uniqid()}
        icon={EmailSharpIcon}
        data={contactInformation._email}
      />
    );
  }

  if (contactInformation._website !== "") {
    contactFields.push(
      <ContactField
        key={uniqid()}
        icon={ComputerSharpIcon}
        data={contactInformation._website}
      />
    );
  }

  if (contactFields.length > 0) {
    return (
      <Box
        sx={{
          boxSizing: "border-box",
          m: 1,
          overflow: "hidden",
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
  }
  return null;
};

export default ResumeContactInfo;
