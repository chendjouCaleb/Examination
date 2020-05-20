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
      this.accepted = value.accepted;

      this.examination = value.examination;
      this.examinationId = value.examinationId;

      this.rejected = value.rejected;

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

  accepted: boolean;

  rejected: boolean;

  student: Student;
  studentId: number;

  examination: Examination;
  examinationId: number;

  speciality: Speciality;
  specialityId: number;

  get url(): string {
    return `/organisations/${this.examination.organisationId}/examinations/${this.examinationId}/applications/${this.id}`;
  }

  get apiUrl(): string {
    return `applications/${this.id}`
  }
}
