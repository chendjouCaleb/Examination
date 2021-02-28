import {Entity} from '../entity';
import {School} from './school.entity';
import {Department} from './department.entity';
import {User} from '../identity/user.entity';
import {Level} from './level.entity';
import {List} from '@positon/collections';
import {CourseHour, CourseSession} from '../course';


export class Room extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;
      this.name = value.name;

      this.capacity = value.capacity;
      this.address = value.address;

      this.departmentId = value.departmentId;
      this.schoolId = value.schoolId;
      this.levelId = value.levelId;

      this.registerUserId = value.registerUserId;
      this.registerUser = value.registerUser;
    }
  }

  name: string;
  capacity: number;
  address: string;

  school: School;
  schoolId: number;

  department: Department;
  departmentId: number;

  level: Level;
  levelId: number;

  registerUserId: string;
  registerUser: User;

  courseHours: List<CourseHour>;
  courseSessions: List<CourseSession>;

  get url(): string {
    return `/schools/${this.schoolId}/rooms/${this.id}`;
  }

  get forSchool(): boolean {
    return !this.department && !this.level;
  }

  get forDepartment(): boolean {
    return this.department && !this.level;
  }

  get forLevel(): boolean {
    return this.level;
  }
}
