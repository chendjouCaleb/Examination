import {Entity} from '../entity';
import {User} from '../identity/user.entity';
import {Student} from './student.entity';
import {Level, LevelSpeciality} from '../organisation';

export class Application extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate ? new Date(value.registrationDate): undefined;

      this.fullName = value.fullName;
      this.registrationId = value.registrationId;
      this.birthDate = new Date(value.birthDate);
      this.gender = value.gender;
      this.processDate = value.processDate ? new Date(value.processDate) : undefined;
      this.state = value.state;

      this.levelId = value.levelId;
      this.levelSpecialityId = value.levelSpecialityId;

      this.userId = value.userId;
      this.user = value.user;

      this.processUserId = value.processUserId;
      this.processUser = value.processUser;
    }
  }

  registrationId: string;
  fullName: string;
  birthDate: Date;
  gender: string;


  userId: string;
  user: User;

  processUserId: string;
  processUser: User;

  processDate: Date;


  student: Student;
  studentId: number;

  level: Level;
  levelId: number;

  levelSpeciality: LevelSpeciality;
  levelSpecialityId: number;

  state: string;


  get waiting(): boolean {
    return this.state === 'WAITING';
  }

  get accepted(): boolean {
    return this.state === 'ACCEPTED';
  }

  get rejected(): boolean {
    return this.state === 'REJECTED';
  }

  /**
   * Whether the current user is the author of the application.
   */
  isAuthor: boolean;

  get levelIndex(): number {
    return this.level.index;
  }

  get specialityName(): string {
    return this.levelSpeciality?.speciality.name;
  }

  get genderName(): string {
    if(this.gender === 'f' || this.gender === 'F') {
      return 'Féminin';
    }
    return 'Masculin'
  }

}
