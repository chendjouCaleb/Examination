import {Entity} from '../entity';
import {Department} from '../organisation';
import {Member} from './member.entity';
import {User} from '../identity/user.entity';

export class Corrector extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;

      this.memberId = value.memberId;
      this.departmentId = value.departmentId;
      this.userId = value.userId;
    }
  }

  userId: string;
  user: User;

  department: Department;
  departmentId: number;

  member: Member;
  memberId: number;
}
