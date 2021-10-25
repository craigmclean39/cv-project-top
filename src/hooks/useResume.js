import { useState, useEffect, useRef, useReducer } from 'react';
import Resume from '../cv/Resume';
import { LocalStorageHelper } from '../localStorageHelper';
import WorkExp from '../cv/WorkExp';
import Education from '../cv/Education';
import Skill from '../cv/Skill';
import ContactInformation from '../cv/ContactInformation';
import { format } from 'date-fns';

const resumeReducer = (state, action) => {
  console.log('resumeReducer ' + action.type);
  console.dir(state);
  console.dir(action);

  switch (action.type) {
    case 'loadResume': {
      return action.payload;
    }
    case 'updateContactInformation': {
      let updatedResume = Object.assign({}, state);
      updatedResume._contactInformation = new ContactInformation(
        action.payload.name,
        action.payload.title,
        action.payload.email,
        action.payload.phone,
        action.payload.website
      );
      return updatedResume;
    }
    case 'addWorkInfo': {
      let updatedResume = Object.assign({}, state);
      updatedResume._workHistory.push(
        new WorkExp(
          action.payload.title,
          action.payload.company,
          action.payload.location,
          action.payload.description,
          format(action.payload.startDate, 'yyyy/MM'),
          format(action.payload.endDate, 'yyyy/MM')
        )
      );
      return updatedResume;
    }
    case 'editWorkInfo': {
      let updatedResume = Object.assign({}, state);
      for (let i = 0; i < updatedResume._workHistory.length; i++) {
        if (updatedResume._workHistory[i]._id === action.payload.idToPopulate) {
          updatedResume._workHistory[i] = new WorkExp(
            action.payload.info.title,
            action.payload.info.company,
            action.payload.info.location,
            action.payload.info.description,
            format(action.payload.info.startDate, 'yyyy/MM'),
            format(action.payload.info.endDate, 'yyyy/MM')
          );
        }
      }
      return updatedResume;
    }
    case 'deleteWorkInfo': {
      let updatedResume = Object.assign({}, state);
      updatedResume._workHistory = updatedResume._workHistory.filter(
        (element) => {
          if (element._id === action.payload) {
            return false;
          }
          return true;
        }
      );
      return updatedResume;
    }
    case 'addEducationInfo': {
      let updatedResume = Object.assign({}, state);
      updatedResume._educationHistory.push(
        new Education(
          action.payload.title,
          action.payload.company,
          action.payload.location,
          action.payload.description,
          format(action.payload.startDate, 'yyyy/MM'),
          format(action.payload.endDate, 'yyyy/MM')
        )
      );
      return updatedResume;
    }
    case 'editEducationInfo': {
      let updatedResume = Object.assign({}, state);
      for (let i = 0; i < updatedResume._educationHistory.length; i++) {
        if (
          updatedResume._educationHistory[i]._id === action.payload.idToPopulate
        ) {
          updatedResume._educationHistory[i] = new Education(
            action.payload.info.title,
            action.payload.info.company,
            action.payload.info.location,
            action.payload.info.description,
            format(action.payload.info.startDate, 'yyyy/MM'),
            format(action.payload.info.endDate, 'yyyy/MM')
          );
        }
      }
      return updatedResume;
    }
    case 'deleteEducationInfo': {
      let updatedResume = Object.assign({}, state);
      updatedResume._educationHistory = updatedResume._educationHistory.filter(
        (element) => {
          if (element._id === action.payload) {
            return false;
          }
          return true;
        }
      );
      return updatedResume;
    }
    case 'updateSkills': {
      let updatedResume = Object.assign({}, state);

      updatedResume._skills = [
        ...updatedResume._skills,
        new Skill(action.payload),
      ];
      return updatedResume;
    }
    case 'deleteSkill': {
      let updatedResume = Object.assign({}, state);

      updatedResume._skills = updatedResume._skills.filter((element) => {
        if (element._id === action.payload) {
          return false;
        }
        return true;
      });
      return updatedResume;
    }
    case 'updateColor': {
      let updatedResume = Object.assign({}, state);
      updatedResume._color = action.payload;
      return updatedResume;
    }
    default:
      return state;
  }
};

const convertStoredResumeToResume = (storedResume) => {
  let newResume = new Resume();

  let contactInformation = new ContactInformation(
    storedResume._contactInformation._firstName.trim(),
    storedResume._contactInformation._title,
    storedResume._contactInformation._phoneNumber,
    storedResume._contactInformation._email,
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
        education._educationTitle,
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

const useResume = () => {
  console.log('useResume');

  const storageHelper = useRef(new LocalStorageHelper());
  const [resume, resumeDispatch] = useReducer(resumeReducer, new Resume());
  const [resumeLoaded, setResumeLoaded] = useState(false);

  useEffect(() => {
    console.log('useResume->useEffect');
    const storedResume = storageHelper.current.retrieveItem('resume');
    let formattedResume;
    if (storedResume != null) {
      formattedResume = convertStoredResumeToResume(storedResume);
      resumeDispatch({ type: 'loadResume', payload: formattedResume });
    }
    setResumeLoaded(true);
  }, []);

  if (resumeLoaded) {
    storageHelper.current.saveItem('resume', resume);
  }
  return { resume, resumeDispatch };
};

export { useResume };
