import uniqid from "uniqid";

export default class Education {
  constructor() {
    this._educationTitle = "";
    this._orgName = "";
    this._location = "";
    this._description = "";
    this._startDate = "";
    this._endDate = "";
    this._id = uniqid();
  }
}
