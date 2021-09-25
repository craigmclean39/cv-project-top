import uniqid from "uniqid";

export default class Resume {
  constructor() {
    this._contactInformation = undefined;
    this._educationHistory = [];
    this._workHistory = [];
    this._skills = [];
  }

  addSkill(newSkill) {
    this._skills = [...this._skills, { skill: newSkill, id: uniqid() }];
  }
}
