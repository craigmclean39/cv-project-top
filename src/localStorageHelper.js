export class LocalStorageHelper {
  constructor() {
    if (typeof Storage !== "undefined") {
      this._storageAvailable = true;
    } else {
      this._storageAvailable = false;
    }
  }

  saveItem(key, objectToSave) {
    if (!this._storageAvailable) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(objectToSave));
  }

  clearItems() {
    if (!this._storageAvailable) {
      return;
    }

    window.localStorage.clear();
  }

  retrieveItem(key) {
    if (!this._storageAvailable) {
      return undefined;
    }

    return JSON.parse(window.localStorage.getItem(key));
  }

  removeItem(key) {
    if (!this._storageAvailable) {
      return;
    }

    window.localStorage.removeItem(key);
  }
}
