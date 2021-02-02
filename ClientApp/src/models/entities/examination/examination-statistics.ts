import {ExaminationDepartment, ExaminationLevel, ExaminationStudent} from "examination/entities";

export abstract class AbstractExaminationStatistics {

  abstract means: number[];
  mean: number = 0;
  median: number = 0;
  std: number;
  mode: number;
  failedCount: number = 0;
  successCount: number = 0;
  studentCount: number;

  paperCount: number = 0;
  presentPaperCount: number = 0;
  correctedPaperCount: number = 0;

  testCount: number = 0;
  waitingTestCount: number = 0;
  progressTestCount: number = 0;
  closedTestCount: number = 0;
  correctedTestCount: number = 0;
  publishedTestCount: number = 0;
  courseWithoutTest: number = 0;
  get testDone(): number {
    return this.testCount - this.waitingTestCount - this.progressTestCount;
  }


  maxStudentId: number;
  maxStudent: ExaminationStudentStatistics;
  maxStudentMean: number;

  minStudentId: number;
  minStudent: ExaminationStudentStatistics;
  minStudentMean: number;



}

export class ExaminationStatistics extends AbstractExaminationStatistics{
  means: number[] = [];

  departmentCount: number;
  specialityCount: number;
  levelCount: number;
  studentCount: number;


  maxDepartmentId: number;
  maxDepartment: ExaminationDepartment;
  maxDepartmentMean: number;

  minDepartmentId: number;
  minDepartment: ExaminationDepartment;
  minDepartmentMean: number;


  maxLevelId: number;
  maxLevel: ExaminationLevel;
  maxLevelMean: number;

  minLevelId: number;
  minLevel: ExaminationLevel;
  minLevelMean: number;
}

export class ExaminationLevelStatistics extends AbstractExaminationStatistics {
  means: number[] = [];

  examinationStudentStatistics: ExaminationStudentStatistics[];

  get maxStudent(): ExaminationStudentStatistics {
    if(!this.examinationStudentStatistics || this.examinationStudentStatistics.length === 0) {
      return undefined;
    }
    return this.examinationStudentStatistics[this.examinationStudentStatistics.length - 1];

  }

  get minStudent(): ExaminationStudentStatistics {
    if(!this.examinationStudentStatistics || this.examinationStudentStatistics.length === 0) {
      return undefined;
    }

    return this.examinationStudentStatistics[0];
  }
}

export class ExaminationStudentStatistics {
   examinationStudentId: number;
   examinationStudent: ExaminationStudent;

   score: number;
   testCount: number;
   correctedTestCount: number;
   radical: number;
   mean: number;
}
