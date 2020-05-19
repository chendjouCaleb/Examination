﻿import {Entity} from "./entity";
import {User} from "./user.entity";
import {Speciality} from "./speciality.entity";
import {Examination} from "./examination.entity";
import {Group} from "./group.entity";

export class Student extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = new Date(value.registrationDate);

      this.fullName = value.fullName;
      this.registrationId = value.registrationId;
      this.birthDate = new Date(value.birthDate);
      this.gender = value.gender;
      this.index = value.index;
      this.groupIndex = value.groupIndex;

      this.examination = value.examination;
      this.examinationId = value.examinationId;

      this.group = value.group;
      this.groupId = value.groupId;

      this.specialityId = value.specialityId;
      this.speciality = value.speciality;

      this.registerUserId = value.registerUserId;
      this.registerUser = value.registerUser;
    }
  }

  registrationId: number;
  fullName: string;
  birthDate: Date;
  gender: string;

  index: number;
  groupIndex: number;


  userId: string;
  user: User;

  examination: Examination;
  examinationId: number;

  registerUserId: string;
  registerUser: User;

  speciality: Speciality;
  specialityId: number;

  group: Group;
  groupId: number;


  get url(): string {
    return `/organisations/${this.examination.organisationId}/examinations/${this.examinationId}/students/${this.id}`;
  }

  get apiUrl(): string {
    return `students/${this.id}`
  }
}
