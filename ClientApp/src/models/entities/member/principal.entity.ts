import {Member} from './member.entity';
import {Department} from '../organisation';
import {Entity} from '../entity';
import {User} from '../identity/user.entity';

export class Principal extends Entity<number> {
  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;
      this.role = value.role;

      this.paperCount = value.paperCount;


      this.departmentId = value.departmentId;
      this.memberId = value.memberId;
      this.userId = value.userId;
    }
  }

  userId: string;
  user: User;

  department: Department;
  departmentId: number;

  member: Member;
  memberId: number;

  role: string;

  paperCount: number;
}
