import uniqid from "uniqid";

export default class WorkExp {
  constructor() {
    this._jobTitle = "";
    this._orgName = "";
    this._location = "";
    this._description = [];
    this._startDate = "";
    this._endDate = "";
    this._id = uniqid();
  }

  addDescription(newDescription) {
    this._description.push({ description: newDescription, id: uniqid() });
  }
}
