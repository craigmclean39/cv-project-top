import uniqid from 'uniqid';

export default class WorkExp {
  constructor(
    jobTitle = '',
    orgName = '',
    location = '',
    description = '',
    startDate = '',
    endDate = ''
  ) {
    this._jobTitle = jobTitle;
    this._orgName = orgName;
    this._location = location;
    this._description = description;
    this._startDate = startDate;
    this._endDate = endDate;
    this._id = uniqid();
  }
}
