import {Entity} from './entity';
import {Examination} from './examination.entity';
import {User} from './user.entity';

export class Speciality extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;
      this.name = value.name;

      this.examination = value.examination;
      this.examinationId = value.examinationId;

      this.registerUserId = value.registerUserId;
      this.registerUser = value.registerUser;
    }
  }

  name: string;
  examination: Examination;
  examinationId: number;

  registerUserId: string;
  registerUser: User;

  studentCount: number;
  testCount: number;

  get url(): string {
    return `/organisations/${this.examination.organisationId}/examinations/${this.examinationId}/specialities/${this.id}`;
  }
}
