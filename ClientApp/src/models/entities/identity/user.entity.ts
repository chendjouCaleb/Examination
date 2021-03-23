import {Entity} from '../entity';
import {List} from '@positon/collections';


import {Paper, Test, TestGroup} from '../test';


import {TestGroupSecretary} from '../test';
import {TestGroupCorrector} from '../test';
import {TestGroupSupervisor} from '../test';
import {School} from '../organisation';
import {Application, Corrector, Secretary, Student, Supervisor} from '../member';
import {Examination, ExaminationSpeciality} from '../examination';

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
  hasImage: boolean;

  country: string;
  state: string;
  city: string;
  street: string;
  postalCode: string;

  webURL: string;
  apiurl: string;

  aboutMe: string;
  website: string;

  schools: List<School> = new List<School>();
  examinations = new List<Examination>();

  specialities = new List<Examination>();

  students = new List<Student>();

  applications = new List<Application>();

  tests = new List<Test>();
  testGroups = new List<TestGroup>();
  papers = new List<Paper>();

  correctors = new List<Corrector>();
  supervisors = new List<Supervisor>();
  secretaries = new List<Secretary>();

  testGroupSecretaries = new List<TestGroupSecretary>();
  testGroupCorrectors = new List<TestGroupCorrector>();
  testGroupSupervisors = new List<TestGroupSupervisor>();

  get fullName() {
    return this.name.trim() + ' ' + this.surname.trim();
  }

  get url(): string {
    return `/users/${this.id}`;
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
    account.hasImage = value.hasImage;

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


  isAffectedByTest(test: Test): boolean {
    return this.isTestCorrector(test)
      || this.isTestSecretary(test)
      || this.isTestSupervisor(test)

  }

  isAffectedByTestGroup(testGroup: TestGroup): boolean {
    return this.isTestGroupCorrector(testGroup)
      || this.isTestGroupSecretary(testGroup)
      || this.isTestGroupSupervisor(testGroup)

  }


  isTestGroupCorrector(testGroup: TestGroup): boolean {
    return this.testGroupCorrectors.exists(tgc => tgc.testGroupId === testGroup.id);
  }

  isTestGroupSupervisor(testGroup: TestGroup): boolean {
    return this.testGroupSupervisors.exists(tgc => tgc.testGroupId === testGroup.id);
  }

  isTestGroupSecretary(testGroup: TestGroup): boolean {
    return this.testGroupSecretaries.exists(tgc => tgc.testGroupId === testGroup.id);
  }

  isTestCorrector(test: Test): boolean {
    return this.testGroupCorrectors.exists(tgc => tgc.testGroup.testId === test.id);
  }

  isTestSupervisor(test: Test): boolean {
    return this.testGroupSupervisors.exists(tgc => tgc.testGroup.testId === test.id);
  }

  isTestSecretary(test: Test): boolean {
    return this.testGroupSecretaries.exists(tgc => tgc.testGroup.testId === test.id);
  }

}


export interface UserModel {
  schools: School[];
  examinations: Examination[ ];


  specialities: ExaminationSpeciality[];

  students: Student[];
  applications: Application [];


  tests: Test[];
  testGroups: TestGroup[];

  papers: Paper[];

  correctors: Corrector[];
  supervisors: Supervisor[];
  secretaries: Secretary[];

  testGroupSecretaries: TestGroupSecretary[];
  testGroupCorrectors: TestGroupCorrector[];
  testGroupSupervisors: TestGroupSupervisor[];
}
