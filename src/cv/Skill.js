import uniqid from 'uniqid';

export default class Skill {
  constructor(skill = '', id = uniqid()) {
    this._skill = skill;
    this._id = id;
  }
}
