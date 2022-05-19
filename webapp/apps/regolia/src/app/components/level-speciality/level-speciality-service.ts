import {Injectable} from "@angular/core";
import {LevelSpeciality} from "examination/entities";
import {MsDialog} from "@ms-fluent/components";
import {LevelSpecialityDelete} from "./delete/level-speciality-delete";

@Injectable({providedIn: 'root'})
export class LevelSpecialityService {
  constructor(private _modal: MsDialog) {
  }



  delete(levelSpeciality: LevelSpeciality): Promise<boolean> {
    const modalRef = this._modal.open(LevelSpecialityDelete, {autoFocus: false});
    modalRef.componentInstance.levelSpeciality = levelSpeciality;

    return modalRef.afterClosed().toPromise();

  }
}
