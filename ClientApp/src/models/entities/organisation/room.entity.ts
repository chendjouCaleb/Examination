import {Entity} from '../entity';
import {School} from './school.entity';
import {Department} from './department.entity';
import {User} from '../identity/user.entity';
import {Level} from "./level.entity";


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

  get url(): string {
    return `/schools/${this.schoolId}/rooms/${this.id}`;
  }
}
