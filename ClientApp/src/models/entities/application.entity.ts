import {Entity} from "./entity";
import {User} from "./user.entity";
import {Speciality} from "./speciality.entity";
import {Examination} from "./examination.entity";
import {Student} from "./student.entity";

export class Application extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = new Date(value.registrationDate);

      this.fullName = value.fullName;
      this.registrationId = value.registrationId;
      this.birthDate = new Date(value.birthDate);
      this.gender = value.gender;
      this.processDate = new Date(value.processDate);
      this.state = value.state;

      this.examination = value.examination;
      this.examinationId = value.examinationId;
      this.specialityId = value.specialityId;
      this.speciality = value.speciality;

      this.userId = value.userId;
      this.user = value.user;

      this.processUserId = value.processUserId;
      this.processUser = value.processUser;
    }
  }

  registrationId: string;
  fullName: string;
  birthDate: Date;
  gender: string;


  userId: string;
  user: User;

  processUserId: string;
  processUser: User;

  processDate: Date;


  student: Student;
  studentId: number;

  examination: Examination;
  examinationId: number;

  speciality: Speciality;
  specialityId: number;

  state: string;


  get waiting(): boolean {
    return this.state === 'WAITING';
  }

  get accepted(): boolean {
    return this.state === 'ACCEPTED';
  }

  get rejected(): boolean {
    return this.state === 'REJECTED';
  }

  /**
   * Whether the current user is the author of the application.
   */
  isAuthor: boolean;

  get url(): string {
    return `/organisations/${this.examination.organisationId}/examinations/${this.examinationId}/applications/${this.id}`;
  }

  get apiUrl(): string {
    return `applications/${this.id}`
  }
}
