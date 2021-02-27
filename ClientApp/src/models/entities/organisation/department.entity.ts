import {School} from './school.entity';
import {Entity} from '../entity';
import {User} from '../identity/user.entity';
import {List} from '@positon/collections';
import {Level} from './level.entity';
import {Speciality} from './speciality.entity';
import {LevelSpeciality} from './level-speciality.entity';
import {Application, Corrector, Principal, Secretary, Student, Supervisor, Teacher} from '../member';
import {Room} from './room.entity';

export class Department extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.name = value.name;
      this.address = value.address;
      this.identifier = value.identifier;

      this.schoolId = value.schoolId;

      this.acronym = value.acronym;

      this.principalUserId = value.principalUserId;
      this.principalUser = value.principalUser;

      this.hasImage = value.hasImage;
      this.imageUrl = value.imageUrl;

      this.hasCoverImage = value.hasCoverImage;
      this.coverImageUrl = value.coverImageUrl;

      this.isPrincipalUser = value.isPrincipalUser;
      this.isSupervisor = value.isSupervisor;
      this.isSecretary = value.isSecretary;
      this.isCorrector = value.isCorrector;
      this.isPrincipal = value.isPrincipal;
      this.isStudent = value.isStudent;
    }
  }

  principalUserId: string;
  principalUser: User;

  name: string;
  identifier: string;
  acronym: string;

  address: string;

  hasImage: boolean;
  imageUrl: string;

  hasCoverImage: boolean;
  coverImageUrl: string;

  userPrincipal: DepartmentUser = {};

  school: School;
  schoolId: number;

  statistics: DepartmentStatistics;

  levels: List<Level>;

  specialities: List<Speciality>;

  correctors: List<Corrector>;
  teachers: List<Teacher>;
  supervisors: List<Supervisor>;
  principals: List<Principal>;
  secretaries: List<Secretary>;

  students: List<Student>;

  applications: List<Application>;

  rooms: List<Room>;

  isPrincipalUser: boolean;
  isSupervisor: boolean;
  isSecretary: boolean;
  isCorrector: boolean;
  isPrincipal: boolean;
  isStudent: boolean;


  addLevelSpecialities(items: List<LevelSpeciality>) {
    for (const item of items) {
      this.specialities.forEach(s => s.addLevelSpeciality(item));
      this.levels.forEach(l => l.addLevelSpeciality(item));
    }
  }

  removeLevelSpeciality(item: LevelSpeciality) {
    this.specialities.forEach(s => s.removeLevelSpeciality(item));
    this.levels.forEach(l => l.removeLevelSpeciality(item));
  }

  addApplication(application: Application) {
    if (this.applications) {
      this.applications.insert(0, application);
    }
  }

  addRoom(room: Room) {
    this.rooms?.insert(0, room);
  }

  removeRoom(room: Room) {
    this.rooms?.removeIf(r => r.id === room.id);
  }

  get url(): string {
    return `/schools/${this.schoolId}/departments/${this.id}`;
  }

}


export interface DepartmentUser {
  isPrincipal?: boolean;
  isSchoolPrincipal?: boolean
}

export class DepartmentStatistics {
  studentCount: number;
  levelCount: number;
  specialityCount: number;
  courseCount: number;
  roomCount: number;
}
