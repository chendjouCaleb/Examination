import {Course} from '../course/course.entity';
import {Entity} from '../entity';

export class Score extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.name = value.name;
    this.radical = value.radical;

    this.courseId = value.courseId;
  }

  name: string;
  radical: number;

  courseId: number;
  course: Course;
}
