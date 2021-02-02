import {ISchoolService} from './school.service.interface';
import {Injectable} from '@angular/core';
import {MsfModal} from 'fabric-docs';
import {School} from 'examination/entities';
import {Confirmation} from 'examination/controls';
import {SchoolAdd} from './add/school-add';
import {SchoolIdentifier} from './identifier/school-identifier';
import {SchoolEdit} from './edit/school-edit';
import {SchoolImage} from './image/school-image';
import {SchoolCoverImage} from 'examination/app/components/school/cover-image/school-cover-image';
import {SchoolDelete} from 'examination/app/components/school/delete/school-delete';

@Injectable()
export class SchoolService implements ISchoolService {
  constructor(private _modal: MsfModal, private _confirmation: Confirmation) {
  }


  add(): Promise<School> {
    const modalRef = this._modal.open(SchoolAdd);
    modalRef.componentInstance.oncancel = () => modalRef.close();
    return modalRef.afterClosed().toPromise();
  }

  changeCoverImage(school: School): Promise<boolean> {
    const modalRef = this._modal.open(SchoolCoverImage, {autoFocus: false});
    modalRef.componentInstance.school = school;
    return modalRef.afterClosed().toPromise();
  }

  changeIdentifier(school: School): Promise<void> {
    const modalRef = this._modal.open(SchoolIdentifier);
    modalRef.componentInstance.school = school;
    return modalRef.afterClosed().toPromise();
  }

  changeImage(school: School): Promise<boolean> {
    const modalRef = this._modal.open(SchoolImage, {autoFocus: false});
    modalRef.componentInstance.school = school;
    return modalRef.afterClosed().toPromise();
  }

  delete(school: School): Promise<boolean> {
    const modalRef = this._modal.open(SchoolDelete, {autoFocus: false});
    modalRef.componentInstance.school = school;
    return modalRef.afterClosed().toPromise();
  }

  edit(school: School): Promise<void> {
    const modalRef = this._modal.open(SchoolEdit);
    modalRef.componentInstance.school = school;
    return modalRef.afterClosed().toPromise();
  }

}
