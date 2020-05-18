import {Entity} from "./entity";
import {User} from "./user.entity";
import {Room} from "./room.entity";
import {Speciality} from "./speciality.entity";
import {Examination} from "./examination.entity";

export class Group extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;

      this.name = value.name;
      this.capacity = value.capacity;
      this.index = value.index;

      this.examination = value.examination;
      this.examinationId = value.examinationId;

      this.specialityId = value.specialityId;
      this.speciality = value.speciality;

      this.registerUserId = value.registerUserId;
      this.registerUser = value.registerUser;
    }
  }

  name: string;
  capacity: number;
  index: number;

  registerUserId: string;
  registerUser: User;

  room: Room;
  roomId: number;

  speciality: Speciality;
  specialityId: number;

  examination: Examination;
  examinationId: number;
}
