import {List} from '@positon/collections';
import {Secretary, Department} from 'examination/models';
import {InjectionToken} from '@angular/core';

export const SECRETARY_SERVICE_TOKEN =
  new InjectionToken<ISecretaryService>('SECRETARY_SERVICE_TOKEN');

export interface ISecretaryService {
  addSecretaries(department: Department): Promise<List<Secretary>>;

  deleteSecretary(secretary: Secretary): Promise<void>;
}
