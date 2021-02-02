import {Examination, ExaminationStudent, School} from "examination/entities";
import {InjectionToken} from "@angular/core";

export const EXAMINATION_SERVICE_TOKEN =
  new InjectionToken<IExaminationService>('EXAMINATION_SERVICE_TOKEN');

export interface IExaminationService {

  add(school: School): Promise<Examination>

  delete(examination: Examination): Promise<boolean>

  reload(examination: Examination): Promise<void>

  relaunch(examination: Examination): Promise<void>

  start(examination: Examination): Promise<void>

  end(examination: Examination): Promise<void>

  details(examination: Examination);

  studentsDetails(examinationStudent: ExaminationStudent);
}
