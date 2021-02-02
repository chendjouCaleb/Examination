import {Entity} from '../entity';
import {User} from '../identity/user.entity';
import {School} from '../organisation';

export class Member extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = new Date(value.registrationDate);

      this.schoolId = value.schoolId;
      this.userId = value.userId;
    }
  }

  userId: string;
  user: User;

  school: School;
  schoolId: number;


  get url(): string {
    return `/schools/${this.schoolId}/members/${this.id}`;
  }

  get apiUrl(): string {
    return `members/${this.id}`
  }
}
