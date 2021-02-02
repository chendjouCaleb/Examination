import {Entity} from '../entity';
import {User} from '../identity/user.entity';
import {Department} from '../organisation';
import {Member} from './member.entity';

export class Secretary extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;

      this.memberId = value.memberId;
      this.departmentId = value.departmentId;
      this.userId = value.userId;


      this.registerUserId = value.registerUserId;
      this.registerUser = value.registerUser;
    }
  }

  userId: string;
  user: User;

  registerUserId: string;
  registerUser: User;

  department: Department;
  departmentId: number;

  member: Member;
  memberId: number;

  paperCount: number;
}
