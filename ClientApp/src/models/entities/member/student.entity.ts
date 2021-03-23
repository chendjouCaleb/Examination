import {Entity} from '../entity';
import {User} from '../identity/user.entity';
import {Level, LevelSpeciality} from '../organisation';
import {List} from '@positon/collections';
import {ExaminationStudent} from '../examination';


export class Student extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = new Date(value.registrationDate);

      this.fullName = value.fullName;
      this.registrationId = value.registrationId;
      this.birthDate = new Date(value.birthDate);
      this.gender = value.gender;

      this.levelId = value.levelId;
      this.levelSpecialityId = value.levelSpecialityId;

      this.userId = value.userId;
      this.user = value.user;

      this.registerUserId = value.registerUserId;
      this.registerUser = value.registerUser;
    }
  }

  registrationId: string;
  fullName: string;
  birthDate: Date;
  gender: string;

  userId: string;
  user: User;

  levelSpeciality: LevelSpeciality;
  levelSpecialityId: number;

  registerUserId: string;
  registerUser: User;

  level: Level;
  levelId: number;

  examinationStudents: List<ExaminationStudent>;

  get url(): string {
    return `${this.level?.url}/students/${this.id}`;
  }

  get apiUrl(): string {
    return `students/${this.id}`
  }

  get levelIndex(): number {
    return this.level.index;
  }

  get specialityName(): string {
    if(this.levelSpeciality) {
      return this.levelSpeciality?.speciality.name;
    }
    return '';
  }
}
