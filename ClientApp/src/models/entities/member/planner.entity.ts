import {Entity} from '../entity';
import {User} from '../identity/user.entity';
import {Member} from './member.entity';
import {School} from '../organisation';


export class Planner extends Entity<number> {
  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;

      this.memberId = value.memberId;
      this.schoolId = value.schoolId;

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

  school: School;
  schoolId: number;

  memberId: number;
  member: Member;
}



