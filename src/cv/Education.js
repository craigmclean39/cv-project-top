import uniqid from "uniqid";

export default class Education {
  constructor() {
    this._educationTitle = "";
    this._orgName = "";
    this._educationLocation = "";
    this._educationDescription = [];
    this._startDate = undefined;
    this._endDate = undefined;
    this._id = uniqid();
  }
}
