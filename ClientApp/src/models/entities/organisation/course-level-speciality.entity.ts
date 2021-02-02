import {Entity} from '../entity';
import {Course} from "./course.entity";
import {LevelSpeciality, TestLevelSpeciality} from "examination/entities";
import {List} from "@positon/collections";


export class CourseLevelSpeciality extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;

      this.courseId = value.courseId;
      this.levelSpecialityId = value.levelSpecialityId;
    }
  }

  courseId: number;
  course: Course;


  levelSpecialityId: number;
  levelSpeciality: LevelSpeciality;

  testLevelSpecialities: List<TestLevelSpeciality>;
}
