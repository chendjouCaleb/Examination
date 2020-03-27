import {Entity} from "./entity";
import {User} from "./user.entity";
import {Examination} from "./examination";
import {Speciality} from "./speciality.entity";

export class Student extends Entity<number> {
  registrationId: number;
  userId: string;
  user: User;
  fullName: string;
  position: number;

  examination: Examination;
  examinationId: number;

  speciality: Speciality;
  specialityId: number;

  paperCount: number;

}
