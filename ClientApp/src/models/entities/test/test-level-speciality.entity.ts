import {Entity} from '../entity';
import {Test} from './test.entity';

import {List} from '@positon/collections';
import {ExaminationLevelSpeciality, ExaminationSpeciality} from '../examination';
import {PaperStatistics} from './paper-statistics';
import {Paper} from './paper.entity';
import {CourseLevelSpeciality} from "../course";


export class TestLevelSpeciality extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;

      this.testId = value.testId;
      this.courseLevelSpecialityId = value.courseLevelSpecialityId;
      this.examinationLevelSpecialityId = value.examinationLevelSpecialityId;
    }
  }

  testId: number;
  test: Test;

  courseLevelSpecialityId: number;
  courseLevelSpeciality: CourseLevelSpeciality;

  examinationLevelSpecialityId: number;
  examinationLevelSpeciality: ExaminationLevelSpeciality;

  examinationSpeciality: ExaminationSpeciality;

  papers: List<Paper>;

  statistics: PaperStatistics = new PaperStatistics();

  get url(): string {
    return `${this.test?.url}/specialities/${this.id}`;
  }

}
