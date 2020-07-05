import {Entity} from './entity';

export class User extends Entity<string> {
  name: string;
  surname: string;
  birthDate: Date;
  gender: string;
  nationalId: string;

  username: string;
  userName: string;
  email: string;
  phoneNumber: string;

  imageName: string;
  imageUrl: string;

  country: string;
  state: string;
  city: string;
  street: string;
  postalCode: string;

  webURL: string;
  apiurl: string;

  aboutMe: string;
  website: string;

  get fullName() {
    return this.name + ' ' + this.surname;
  }


  static createFromAny(value: any): User {
    if (!value || value === 'null') {
      return null;
    }

    const account = new User();

    account.id = value.id;
    account.registrationDate = value.registrationDate;
    account.name = value.name;
    account.surname = value.surname;
    account.birthDate = value.birthDate;
    account.gender = value.gender;
    account.nationalId = value.nationalId;

    account.username = value.userName;
    account.userName = value.userName;
    account.email = value.email;
    account.phoneNumber = value.phoneNumber;

    account.imageName = value.imageName;
    account.imageUrl = value.imageUrl;

    account.country = value.country;
    account.state = value.state;
    account.city = value.city;
    account.street = value.street;
    account.postalCode = value.postalCode;

    account.webURL = value.webURL;
    account.apiurl = value.apiUrl;

    account.aboutMe = value.aboutMe;
    account.website = value.website;

    if (!account.imageUrl) {
      account.imageUrl = 'assets/default-account.png';
    }

    return account;

  }
}



