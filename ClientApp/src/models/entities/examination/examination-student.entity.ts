import {Entity} from '../entity';
import {Student} from '../member';
import {ExaminationLevelSpeciality} from './examination-level-speciality.entity';
import {ExaminationLevel} from './examination-level.entity';
import {List} from '@positon/collections';
import {Paper} from '../test';


export class ExaminationStudent extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.apply(value);
    }
  }

  apply(value: any = {}) {
    this.id = value.id;
    this.registrationDate = value.registrationDate;
    this.name = value.name;

    this.studentId = value.studentId;
    this.student = new Student(value.student);

    this.examinationLevelId = value.examinationLevelId;
    this.examinationLevel = new ExaminationLevel(value.examinationLevel);
    this.examinationLevelSpecialityId = value.examinationLevelSpecialityId;
    this.startDate = value.startDate ? new Date(value.startDate) : null;
    this.endDate = value.endDate ? new Date(value.endDate) : null;
    this.isClosed = value.isClosed;

  }

  name: string;
  isClosed: boolean;


  startDate: Date;
  endDate: Date;

  student: Student;
  studentId: number;

  examinationLevel: ExaminationLevel;
  examinationLevelId: number;

  examinationLevelSpeciality: ExaminationLevelSpeciality;
  examinationLevelSpecialityId: number;

  papers: List<Paper>;

  get statistics(): ExaminationStudentStatistics {
    return new ExaminationStudentStatistics(this.papers.toArray());
  }

  get specialityName(): string {
    return this.examinationLevelSpeciality?.examinationSpeciality.speciality.name;
  }

  get levelIndex(): number {
    return this.examinationLevel?.level?.index;
  }

  get url(): string {
    return `${this.examinationLevel?.url}/students/${this.id}`;
  }


  get state(): string {
    if (this.isClosed) {
      return 'CLOSED';
    }
    if (this.endDate) {
      return 'FINISHED';
    }
    if (this.startDate) {
      return 'PROGRESS';
    }

    return 'PENDING';
  }
}


export class ExaminationStudentStatistics {

  constructor(private papers: Array<Paper>) { }


  get score(): number {
    return this.papers.map(p => p.score * p.test?.coefficient).reduce((a, b) => a + b, 0)
  }

  get testCount(): number {
    return this.papers.length;
  }

  get correctedTestCount(): number {
    return this.papers.filter(p => p.isCorrected).length;
  }

  get radical(): number {
    return this.papers.map(p => p.test?.radical * p.test?.coefficient).reduce((a, b) => a + b, 0)
  }

  get mean(): number {
    return this.score / this.radical;
  }

}
