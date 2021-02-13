import {ILevelService} from './level.service.interface';
import {Injectable} from '@angular/core';
import {MsfModal} from 'fabric-docs';
import {Department, Level, LevelSpeciality} from 'examination/entities';
import {Confirmation} from 'examination/controls';
import {LevelAdd} from './add/level-add';
import {LevelDelete} from './delete/level-delete';
import {LevelSpecialityHttpClient} from 'examination/models/http';
import {LevelSpecialityAdd} from './speciality/level-speciality-add';

@Injectable()
export class LevelService implements ILevelService {
  constructor(private _modal: MsfModal,
              private _levelSpecialityHttpClient: LevelSpecialityHttpClient,
              private _confirmation: Confirmation) {
  }


  add(department: Department): Promise<Level> {
    const modalRef = this._modal.open(LevelAdd);
    modalRef.componentInstance.department = department;
    return modalRef.afterClosed().toPromise();
  }



  delete(level: Level): Promise<boolean> {
    const modalRef = this._modal.open(LevelDelete, {autoFocus: false});
    modalRef.componentInstance.level = level;
    return modalRef.afterClosed().toPromise();
  }

  addSpeciality(level: Level): Promise<LevelSpeciality> {
    const modalRef = this._modal.open(LevelSpecialityAdd, {autoFocus: false});
    modalRef.componentInstance.level = level;

    return modalRef.afterClosed().toPromise();
  }

  removeSpeciality(levelSpeciality: LevelSpeciality): Promise<boolean> {
    const m = `Enlever la spécialité ${levelSpeciality?.speciality?.name} au niveau ${levelSpeciality?.level?.index}?`;
    const result = this._confirmation.open(m);

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._levelSpecialityHttpClient.delete(levelSpeciality.id);
        levelSpeciality.level.department.removeLevelSpeciality(levelSpeciality);
        resolve(true);

      });
    });
  }


}
