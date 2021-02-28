import {Entity} from '../entity';
import {User} from '../identity/user.entity';
import {Member} from './member.entity';
import {Department} from '../organisation';
import {List} from '@positon/collections';
import {CourseHour, CourseSession, CourseTeacher} from '../course';


export class Teacher extends Entity<number> {
  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;


      this.memberId = value.memberId;
      this.departmentId = value.departmentId;

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

  department: Department;
  departmentId: number;

  memberId: number;
  member: Member;

  courseHours: List<CourseHour>;
  courseSessions: List<CourseSession>;
  courseTeachers: List<CourseTeacher>;

  get url(): string {
    return `${this.department.url}/teachers/${this.id}`;
  }
}



