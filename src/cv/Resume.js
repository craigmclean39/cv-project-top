import ContactInformation from './ContactInformation';
import { blue } from '@mui/material/colors';

export default class Resume {
  constructor() {
    this._contactInformation = new ContactInformation();
    this._educationHistory = [];
    this._workHistory = [];
    this._skills = [];
    this._color = blue;
  }
}
