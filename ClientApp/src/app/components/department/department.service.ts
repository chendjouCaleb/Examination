import {IDepartmentService} from './department.service.interface';
import {Injectable} from '@angular/core';
import {MsfModal} from 'fabric-docs';
import {Department, School} from 'examination/entities';
import {Confirmation} from 'examination/controls';
import {DepartmentAdd} from './add/department-add';
import {DepartmentEdit} from './edit/department-edit';
import {DepartmentImage} from './image/department-image';
import {DepartmentCoverImage} from './cover-image/department-cover-image';
import {DepartmentDelete} from './delete/department-delete';

@Injectable()
export class DepartmentService implements IDepartmentService {
  constructor(private _modal: MsfModal, private _confirmation: Confirmation) {
  }


  add(school: School): Promise<Department> {
    const modalRef = this._modal.open(DepartmentAdd);
    modalRef.componentInstance.school = school;
    return modalRef.afterClosed().toPromise();
  }

  changeCoverImage(department: Department): Promise<boolean> {
    const modalRef = this._modal.open(DepartmentCoverImage, {autoFocus: false});
    modalRef.componentInstance.department = department;
    return modalRef.afterClosed().toPromise();
  }


  changeImage(department: Department): Promise<boolean> {
    const modalRef = this._modal.open(DepartmentImage, {autoFocus: false});
    modalRef.componentInstance.department = department;
    return modalRef.afterClosed().toPromise();
  }

  delete(department: Department): Promise<boolean> {
    const modalRef = this._modal.open(DepartmentDelete, {autoFocus: false});
    modalRef.componentInstance.department = department;
    return modalRef.afterClosed().toPromise();
  }

  edit(department: Department): Promise<void> {
    const modalRef = this._modal.open(DepartmentEdit);
    modalRef.componentInstance.department = department;
    return modalRef.afterClosed().toPromise();
  }

}
