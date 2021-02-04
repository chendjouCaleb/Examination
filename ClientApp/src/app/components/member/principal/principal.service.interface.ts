import {List} from '@positon/collections';
import {Principal, Department} from 'examination/models';
import {InjectionToken} from '@angular/core';

export const PRINCIPAL_SERVICE_TOKEN =
  new InjectionToken<IPrincipalService>('PRINCIPAL_SERVICE_TOKEN');

export interface IPrincipalService {
  addPrincipals(department: Department): Promise<List<Principal>>;

  deletePrincipal(principal: Principal): Promise<boolean>;
}
