export default class ContactInformation {
  constructor(
    firstName = '',
    title = '',
    phoneNumber = '',
    email = '',
    website = ''
  ) {
    this._firstName = firstName;
    this._title = title;
    this._phoneNumber = phoneNumber;
    this._email = email;
    this._website = website;
  }
}
