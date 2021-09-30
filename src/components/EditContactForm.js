import * as React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { validate } from 'email-validator';
import { useState } from 'react';

const EditContactForm = (props) => {
  const { contactInformation } = props;
  const [name, setName] = useState(contactInformation._firstName);
  const [title, setTitle] = useState(contactInformation._title);
  const [email, setEmail] = useState(contactInformation._email);
  const [phone, setPhone] = useState(contactInformation._phoneNumber);
  const [website, setWebsite] = useState(contactInformation._website);
  const [phoneError, setPhoneError] = useState(false);
  const [phoneHelperText, setPhoneHelperText] = useState('');
  const [phoneColor, setPhoneColor] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');
  const [emailColor, setEmailColor] = useState('');

  const handleChange = (name) => (e) => {
    switch (name) {
      case 'name': {
        setName(e.target.value);
        break;
      }
      case 'title': {
        setTitle(e.target.value);
        break;
      }
      case 'email': {
        setEmail(e.target.value);
        break;
      }
      case 'phone': {
        setPhone(e.target.value);
        break;
      }
      case 'website': {
        setWebsite(e.target.value);
        break;
      }
      default:
        break;
    }
  };

  const validatePhoneNumber = (event) => {
    const phoneRegex =
      /^\+?(\s*)?(\d{1,2})?(\s*)?-?(\s*)?\(?\d{3}\)?(\s*)?-?(\s*)?\d{3}(\s*)?-?(\s*)?(\s*)?\d{4}$/;
    if (!event.target.value.match(phoneRegex) && event.target.value !== '') {
      setPhoneError(true);
      setPhoneHelperText(
        'Enter 10 digit Phone Number with or without country code, #-###-###-####'
      );
    } else {
      setPhone(event.target.value);
      setPhoneError(false);
      setPhoneHelperText('');
      setPhoneColor('success');
    }
  };

  const validateEmail = (event) => {
    if (!validate(event.target.value) && event.target.value !== '') {
      setEmailError(true);
      setEmailHelperText('Enter valid email address');
    } else {
      setEmailError(false);
      setEmailHelperText('');
      setEmailColor('success');
      setEmail(event.target.value);
    }
  };

  const saveFormInfo = (e) => {
    e.preventDefault();
    const { updateContactInfo } = props;
    updateContactInfo({ name, title, email, phone, website });
    props.handleClose();
  };

  const { open, handleClose } = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Contact Details</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            type='text'
            fullWidth
            variant='outlined'
            defaultValue={
              contactInformation._firstName + ' ' + contactInformation._lastName
            }
            onChange={handleChange('name')}
          />
          <TextField
            margin='dense'
            id='title'
            label='Title'
            type='text'
            fullWidth
            variant='outlined'
            defaultValue={contactInformation._title}
            onChange={handleChange('title')}
          />
          <TextField
            margin='dense'
            id='email'
            label='Email Address'
            type='email'
            fullWidth
            variant='outlined'
            defaultValue={contactInformation._email}
            onChange={validateEmail}
            error={emailError}
            helperText={emailHelperText}
            color={emailColor}
          />
          <TextField
            margin='dense'
            id='phone-number'
            label='Phone Number'
            type='text'
            fullWidth
            variant='outlined'
            defaultValue={contactInformation._phoneNumber}
            onChange={validatePhoneNumber}
            error={phoneError}
            helperText={phoneHelperText}
            color={phoneColor}
          />
          <TextField
            margin='dense'
            id='website'
            label='Website'
            type='text'
            fullWidth
            variant='outlined'
            defaultValue={contactInformation._website}
            onChange={handleChange('website')}
          />

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' onClick={saveFormInfo}>
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditContactForm;
