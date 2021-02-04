import {Component, Inject, Input} from '@angular/core';
import {Speciality} from 'examination/entities';
import {ISpecialityService, SPECIALITY_SERVICE_TOKEN} from 'examination/app/components';
import {CurrentItems} from 'examination/app/current-items';

@Component({
  templateUrl: 'speciality.page-layout.html',
  selector: 'app-speciality-page-layout'
})
export class SpecialityPageLayout {
  @Input()
  speciality: Speciality;

  constructor(private currentItems: CurrentItems,
              @Inject(SPECIALITY_SERVICE_TOKEN) public service: ISpecialityService) {
    this.speciality = this.currentItems.get('speciality');
  }
}
