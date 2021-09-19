import ContactInformation from "./ContactInformation";
import Education from "./Education";
import WorkExp from "./WorkExp";

export default class Resume {
  constructor() {
    this._contactInfomration = new ContactInformation();
    this._educationHistory = [];
    this._workHistory = [];
  }
}
