import { LocalStorageHelper } from '../localStorageHelper';
import ContactInformation from './ContactInformation';
import Education from './Education';
import Resume from './Resume';
import WorkExp from './WorkExp';
import { format } from 'date-fns';
import Skill from './Skill';

export default class ResumeHandler {
  constructor() {
    this.storageHelper = new LocalStorageHelper();
    let storedResume = this.storageHelper.retrieveItem('resume');
    this._workingResumeIndex = 0;
    this._resumes = [];

    if (storedResume != null) {
      let newResume = this.convertStoredResumeToResume(storedResume);
      this._resumes.push(newResume);
    } else {
      this._resumes.push(new Resume());
    }
  }

  getWorkingResume = () => {
    return this._resumes[this._workingResumeIndex];
  };

  convertStoredResumeToResume = (storedResume) => {
    let newResume = new Resume();

    let contactInformation = new ContactInformation(
      storedResume._contactInformation._firstName.trim(),
      storedResume._contactInformation._title,
      storedResume._contactInformation._email,
      storedResume._contactInformation._phoneNumber,
      storedResume._contactInformation._website
    );

    newResume._contactInformation = contactInformation;

    newResume._workHistory = storedResume._workHistory.map((work) => {
      return new WorkExp(
        work._jobTitle,
        work._orgName,
        work._location,
        work._description,
        work._startDate,
        work._endDate
      );
    });

    newResume._educationHistory = storedResume._educationHistory.map(
      (education) => {
        return new Education(
          education._jobTitle,
          education._orgName,
          education._location,
          education._description,
          education._startDate,
          education._endDate
        );
      }
    );

    newResume._skills = storedResume._skills.map((skill) => {
      return new Skill(skill._skill, skill._id);
    });

    newResume._color = storedResume._color;

    return newResume;
  };

  updateContactInformation = (info) => {
    let updatedResume = Object.assign({}, this.getWorkingResume());
    updatedResume._contactInformation = new ContactInformation(
      info.name,
      info.title,
      info.phone,
      info.email,
      info.website
    );
    this.saveWorkingResume(updatedResume);
  };

  editWorkInfo = (info, id) => {
    let updatedResume = Object.assign({}, this.getWorkingResume());
    for (let i = 0; i < updatedResume._workHistory.length; i++) {
      if (updatedResume._workHistory[i]._id === id) {
        updatedResume._workHistory[i] = new WorkExp(
          info.title,
          info.company,
          info.location,
          info.description,
          format(info.startDate, 'yyyy/MM'),
          format(info.endDate, 'yyyy/MM')
        );
      }
    }
    this.saveWorkingResume(updatedResume);
  };

  editEducationInfo = (info, id) => {
    let updatedResume = Object.assign({}, this.getWorkingResume());
    for (let i = 0; i < updatedResume._educationHistory.length; i++) {
      if (updatedResume._educationHistory[i]._id === id) {
        updatedResume._educationHistory[i] = new Education(
          info.title,
          info.company,
          info.location,
          info.description,
          format(info.startDate, 'yyyy/MM'),
          format(info.endDate, 'yyyy/MM')
        );
      }
    }
    this.saveWorkingResume(updatedResume);
  };

  addWorkInfo = (info) => {
    let updatedResume = Object.assign({}, this.getWorkingResume());
    updatedResume._workHistory.push(
      new WorkExp(
        info.title,
        info.company,
        info.location,
        info.description,
        format(info.startDate, 'yyyy/MM'),
        format(info.endDate, 'yyyy/MM')
      )
    );
    this.saveWorkingResume(updatedResume);
  };

  addEducationInfo = (info) => {
    let updatedResume = Object.assign({}, this.getWorkingResume());
    updatedResume._educationHistory.push(
      new Education(
        info.title,
        info.company,
        info.location,
        info.description,
        format(info.startDate, 'yyyy/MM'),
        format(info.endDate, 'yyyy/MM')
      )
    );
    this.saveWorkingResume(updatedResume);
  };

  deleteWorkInfo = (id) => {
    let updatedResume = Object.assign({}, this.getWorkingResume());
    updatedResume._workHistory = updatedResume._workHistory.filter(
      (element) => {
        if (element._id === id) {
          return false;
        }
        return true;
      }
    );

    this.saveWorkingResume(updatedResume);
  };

  deleteEducationInfo = (id) => {
    let updatedResume = Object.assign({}, this.getWorkingResume());
    updatedResume._educationHistory = updatedResume._educationHistory.filter(
      (element) => {
        if (element._id === id) {
          return false;
        }
        return true;
      }
    );
    this.saveWorkingResume(updatedResume);
  };

  updateSkills = (info) => {
    let updatedResume = Object.assign({}, this.getWorkingResume());

    updatedResume._skills = [...updatedResume._skills, new Skill(info)];
    this.saveWorkingResume(updatedResume);
  };

  deleteSkill = (id) => {
    let updatedResume = Object.assign({}, this.getWorkingResume());

    updatedResume._skills = updatedResume._skills.filter((element) => {
      if (element._id === id) {
        return false;
      }
      return true;
    });
    this.saveWorkingResume(updatedResume);
  };

  updateColor = (color) => {
    let updatedResume = Object.assign({}, this.getWorkingResume());
    updatedResume._color = color;
    this.saveWorkingResume(updatedResume);
  };

  saveWorkingResume(updatedResume) {
    this._resumes[this._workingResumeIndex] = updatedResume;
    this.storageHelper.saveItem('resume', updatedResume);
  }
}
