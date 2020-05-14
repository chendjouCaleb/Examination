﻿import {Entity} from './entity';
import {User} from './user.entity';
import {Examination} from './examination.entity';

export class Corrector extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;

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

  paperCount: number;
}
