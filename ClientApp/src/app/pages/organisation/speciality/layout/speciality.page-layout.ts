import {Component, Inject, Input} from '@angular/core';
import {Speciality} from 'examination/entities';
import {ISpecialityService, SPECIALITY_SERVICE_TOKEN} from 'examination/app/components';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'speciality.page-layout.html',
  selector: 'app-speciality-page-layout'
})
export class SpecialityPageLayout {
  @Input()
  speciality: Speciality;

  constructor(private currentItems: CurrentItems,
              private _router: Router,
              @Inject(SPECIALITY_SERVICE_TOKEN) public service: ISpecialityService) {
    this.speciality = this.currentItems.get('speciality');
  }


  delete() {
    this.service.delete(this.speciality).then(result => {
      if (result) {
        this._router.navigateByUrl(this.speciality.department.url);
      }
    })
  }
}
