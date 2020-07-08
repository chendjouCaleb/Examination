import {Entity} from './entity';
import {List} from "@positon/collections";
import {Organisation} from "./organisation";
import {Admin} from "./admin.entity";
import {Speciality} from "./speciality.entity";
import {Student} from "./student.entity";
import {Application} from "./application.entity";
import {Group} from "./group.entity";
import {Test} from "./test.entity";
import {TestGroup} from "./test-group.entity";
import {Paper} from "./paper.entity";
import {Corrector} from "./corrector.entity";
import {Supervisor} from "./supervisor.entity";
import {Secretary} from "./secretary.entity";
import {TestGroupSecretary} from "./test-group-secretary.entity";
import {TestGroupCorrector} from "./test-group-corrector.entity";
import {TestGroupSupervisor} from "./test-group-supervisor.entity";
import {Examination} from "./examination.entity";

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

  organisations: List<Organisation> = new List<Organisation>();
  examinations = new List<Examination>();

  admins = new List<Admin>();

  specialities = new List<Speciality>();

  students = new List<Student>();

  applications = new List<Application>();

  groups = new List<Group>();
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
    return this.name + ' ' + this.surname;
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
    return this.isTestAdmin(test)
    || this.isTestCorrector(test)
    || this.isTestSecretary(test)
    || this.isTestSupervisor(test)
    || this.isTestStudent(test)
  }

  isAffectedByTestGroup(testGroup: TestGroup): boolean {
    return this.isTestAdmin(testGroup.test)
      || this.isTestGroupCorrector(testGroup)
      || this.isTestGroupSecretary(testGroup)
      || this.isTestGroupSupervisor(testGroup)
      || this.isTestGroupStudent(testGroup)
  }

  isTestAdmin(test: Test) {
    return this.admins.exists(a => a.organisationId === test.examination.organisationId);
  }

  isTestGroupStudent(testGroup: TestGroup): boolean {
    return this.students.exists(s => s.groupId === testGroup.groupId);
  }

  isTestGroupCorrector(testGroup: TestGroup): boolean {
    return this.testGroupCorrectors.exists(tgc => tgc.testGroupId === testGroup.id );
  }

  isTestGroupSupervisor(testGroup: TestGroup): boolean {
    return this.testGroupSupervisors.exists(tgc => tgc.testGroupId === testGroup.id );
  }

  isTestGroupSecretary(testGroup: TestGroup): boolean {
    return this.testGroupSecretaries.exists(tgc => tgc.testGroupId === testGroup.id );
  }

  isTestCorrector(test: Test): boolean {
    return this.testGroupCorrectors.exists(tgc => tgc.testGroup.testId === test.id );
  }

  isTestSupervisor(test: Test): boolean {
    return this.testGroupSupervisors.exists(tgc => tgc.testGroup.testId === test.id );
  }

  isTestSecretary(test: Test): boolean {
    return this.testGroupSecretaries.exists(tgc => tgc.testGroup.testId === test.id );
  }

  isTestStudent(test: Test): boolean {
    return this.students.containsIf(s => !test.speciality && s.examinationId === test.examinationId)
    || this.students.containsIf(s =>  test.speciality && s.specialityId === test.specialityId)
  }
}


export interface UserModel {
  organisations: Organisation[];
  examinations: Examination[ ];

  admins: Admin[];

  specialities: Speciality[];

  students: Student[];
  applications: Application [];

  groups: Group[];
  tests: Test[];
  testGroups: TestGroup[];

  papers: Paper[];

  correctors: Corrector[];
  supervisors: Supervisor[];
  secretaries: Secretary[];

  testGroupSecretaries:TestGroupSecretary[];
  testGroupCorrectors:TestGroupCorrector[];
  testGroupSupervisors:TestGroupSupervisor[];
}
