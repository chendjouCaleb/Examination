
import { Department } from './department.entity';
import {Entity} from '../entity';
import {List} from "@positon/collections";
import {LevelSpeciality} from "./level-speciality.entity";
import {Course} from "./course.entity";
import {Application, Student} from "../member";
import {ExaminationLevel} from "../examination";
import {Room} from "./room.entity";

export class Level extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.index = value.index;
      this.departmentId = value.departmentId;
    }
  }


  index: number;
  departmentId: number;
  department: Department;

  courses: List<Course>;
  students: List<Student>;
  applications: List<Application>;
  rooms: List<Room>;
  levelSpecialities: List<LevelSpeciality>;
  examinationLevels: List<ExaminationLevel>;

  userPrincipal: LevelUser = {};

  addLevelSpeciality(item: LevelSpeciality) {
    if(item.level.id === this.id) {
      this.levelSpecialities.add(item);
    }
  }

  addCourse(course: Course) {
    if(this.courses && !this.courses.containsIf(c => c.id === course.id)) {
      this.courses.add(course);
    }
  }

  addApplication(application: Application) {
    if(this.applications) {
      this.applications.insert(0, application);
    }
  }

  removeCourse(course: Course) {
    if(this.courses) {
      this.courses.remove(course);
    }
  }

  removeLevelSpeciality(item: LevelSpeciality) {
    this.levelSpecialities.removeIf(ls => ls.id === item.id);
  }

  addRoom(room: Room) {
    this.rooms?.insert(0, room);
  }

  removeRoom(room: Room) {
    this.rooms?.removeIf(r => r.id === room.id);
  }


  get url(): string {
    return `${this.department.url}/levels/${this.id}`;
  }

}


export interface LevelUser {
  isDepartmentPrincipal?: boolean;
  isSchoolPrincipal?: boolean
}
