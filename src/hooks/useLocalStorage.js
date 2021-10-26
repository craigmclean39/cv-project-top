import { useRef } from 'react';

const useLocalStorage = (keyToUse) => {
  const storageAvailable = useRef(
    typeof Storage !== 'undefined' ? true : false
  );
  const key = useRef(keyToUse);

  const saveItem = (objectToSave) => {
    if (storageAvailable) {
      window.localStorage.setItem(key, JSON.stringify(objectToSave));
    }
  };

  const retrieveItem = () => {
    if (storageAvailable) {
      return JSON.parse(window.localStorage.getItem(key));
    }
  };

  return { saveItem, retrieveItem };
};

export { useLocalStorage };
