
import {Department} from './department.entity';
import {Entity} from '../entity';
import {List} from "@positon/collections";
import {LevelSpeciality} from "./level-speciality.entity";
import {Course} from "./course.entity";
import {ExaminationSpeciality} from "../examination";

export class Speciality extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.name = value.name;
      this.description = value.description;
      this.departmentId = value.departmentId;
    }
  }


  name: string;
  description: string;

  departmentId: number;
  department: Department;

  levelSpecialities: List<LevelSpeciality>;
  examinationSpecialities: List<ExaminationSpeciality>;
  courses: List<Course>;

  addLevelSpeciality(item: LevelSpeciality) {
    if(item.specialityId === this.id) {
      this.levelSpecialities.add(item);
    }
  }

  removeLevelSpeciality(item: LevelSpeciality) {
    this.levelSpecialities.removeIf(ls => ls.id === item.id);
  }

  addCourse(course: Course) {
    if(this.courses) {
      this.courses.add(course);
    }
  }

  removeCourse(course: Course) {
    if(this.courses) {
      this.courses.remove(course);
    }
  }

  get url(): string {
    return `${this.department.url}/specialities/${this.id}`;
  }

}

