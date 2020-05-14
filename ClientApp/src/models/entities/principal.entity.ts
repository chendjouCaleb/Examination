import {Entity} from './entity';
import {User} from './user.entity';
import {Examination} from './examination.entity';

export class Principal extends Entity<number> {
  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;
      this.role = value.role;

      this.paperCount = value.paperCount;

      this.examination = value.examination;
      this.examinationId = value.examinationId;

      this.userId = value.userId;
      this.user = value.user;

      this.registerUserId = value.registerUserId;
      this.registerUser = value.registerUser;
    }
  }

  userId: string;
  user: User;

  registerUserId: string;
  registerUser: User;

  examination: Examination;
  examinationId: number;

  role: string;

  paperCount: number;
}
