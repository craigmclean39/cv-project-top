import uniqid from 'uniqid';

export default class Education {
  constructor(
    educationTitle = '',
    orgName = '',
    location = '',
    description = '',
    startDate = '',
    endDate = ''
  ) {
    this._educationTitle = educationTitle;
    this._orgName = orgName;
    this._location = location;
    this._description = description;
    this._startDate = startDate;
    this._endDate = endDate;
    this._id = uniqid();
  }
}
