import {List} from '@positon/collections';
import {Supervisor, Department} from 'examination/models';
import {InjectionToken} from '@angular/core';

export const SUPERVISOR_SERVICE_TOKEN =
  new InjectionToken<ISupervisorService>('SUPERVISOR_SERVICE_TOKEN');

export interface ISupervisorService {
  addSupervisors(department: Department): Promise<List<Supervisor>>;

  deleteSupervisor(supervisor: Supervisor): Promise<void>;
}
