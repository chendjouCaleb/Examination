import {List} from '@positon/collections';
import {Corrector, Department} from 'examination/models';
import {InjectionToken} from '@angular/core';

export const CORRECTOR_SERVICE_TOKEN =
  new InjectionToken<ICorrectorService>('CORRECTOR_SERVICE_TOKEN');

export interface ICorrectorService {
  addCorrectors(department: Department): Promise<List<Corrector>>;
  deleteCorrector(corrector: Corrector): Promise<boolean>;
}
