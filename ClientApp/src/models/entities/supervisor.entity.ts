﻿import {Entity} from "./entity";
import {User} from "./user.entity";
import {Examination} from "./examination.entity";
import {Test} from "./test.entity";
import {Group} from "./group.entity";

export class Supervisor extends Entity<number> {
  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;


      this.examination = value.examination;
      this.examinationId = value.examinationId;

      this.userId = value.userId;
      this.user = value.user;

      this.registerUserId = value.registerUserId;
      this.registerUser = value.registerUser;
    }
  }

  user: User;
  userId: string;

  registerUserId: string;
  registerUser: User;

  examination: Examination;
  examinationId: number;
}


export class TestSupervisor extends Entity<number> {
  isPrincipal: boolean;
  supervisor: Supervisor;
  supervisorId: number;

  test: Test;
  testId: number;

  group: Group;
  groupId: number;
}
