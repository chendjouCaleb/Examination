import {ISpecialityService} from './speciality.service.interface';
import {Injectable} from '@angular/core';
import {Department, LevelSpeciality, Speciality} from 'examination/entities';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {SpecialityAdd} from './add/speciality-add';
import {SpecialityEdit} from './edit/speciality-edit';
import {SpecialityDelete} from './delete/speciality-delete';
import {LevelSpecialityHttpClient} from 'examination/models/http';
import {SpecialityLevelAdd} from './level/speciality-level-add';
import {MsDialog} from '@ms-fluent/components';

@Injectable()
export class SpecialityService implements ISpecialityService {
  constructor(private _modal: MsDialog,
              private _alertEmitter: AlertEmitter,
              private _levelSpecialityHttpClient: LevelSpecialityHttpClient,
              private _confirmation: Confirmation) {
  }


  add(department: Department): Promise<Speciality> {
    const modalRef = this._modal.open(SpecialityAdd);
    modalRef.componentInstance.department = department;
    return modalRef.afterClosed().toPromise();
  }


  delete(speciality: Speciality): Promise<boolean> {
    const modalRef = this._modal.open(SpecialityDelete, {autoFocus: false});
    modalRef.componentInstance.speciality = speciality;
    return modalRef.afterClosed().toPromise();
  }

  edit(speciality: Speciality): Promise<void> {
    const modalRef = this._modal.open(SpecialityEdit);
    modalRef.componentInstance.speciality = speciality;
    return modalRef.afterClosed().toPromise();
  }

  addLevelSpeciality(speciality: Speciality): Promise<LevelSpeciality> {
    const modalRef = this._modal.open(SpecialityLevelAdd, {autoFocus: false});
    modalRef.componentInstance.speciality = speciality;

    return modalRef.afterClosed().toPromise();
  }

  removeLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<boolean> {
    const m = `Enlever le niveau ${levelSpeciality.level.index + 1} à la spécialité ${levelSpeciality.speciality.name}?`;
    const result = this._confirmation.open(m);

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._levelSpecialityHttpClient.delete(levelSpeciality.id);
        this._alertEmitter
          .info(`Le niveau ${levelSpeciality.level.index + 1} a été enlevé de la spécialité ${levelSpeciality.speciality.name}?`);

        levelSpeciality.level.department.removeLevelSpeciality(levelSpeciality);
        resolve(true);
      });
    });
  }

}
