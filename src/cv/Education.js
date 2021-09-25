import uniqid from "uniqid";
import { format } from "date-fns";

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

  get startDate() {
    return format(this._startDate, "yyyy/MM");
  }

  get endDate() {
    return format(this._endDate, "yyyy/MM");
  }
}
