import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Injectable} from '@angular/core';
import {ExaminationLevel, ExaminationLevelSpeciality, ExaminationSpeciality} from 'examination/entities';

@Injectable()
export class ExaminationLevelSpecialityHttpClient extends GenericHttpClient<ExaminationLevelSpeciality, number> {
  url: string = SERVER_URL + '/examinationLevelSpecialities';

  createFromAny(value: any): ExaminationLevelSpeciality {
    return new ExaminationLevelSpeciality(value);
  }

  addExaminationLevelSpeciality(examinationLevel: ExaminationLevel,
                                examinationSpeciality: ExaminationSpeciality): Promise<ExaminationLevelSpeciality> {
    return this.add({examinationSpecialityId: examinationSpeciality.id, examinationLevelId: examinationLevel.id});
  }

}
