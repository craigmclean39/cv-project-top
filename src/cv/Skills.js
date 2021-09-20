import uniqid from "uniqid";

export default class Skills {
  constructor() {
    this._skills = [];
  }

  addSkill(newSkill) {
    this._skills.push({ skill: newSkill, id: uniqid() });
  }
}
