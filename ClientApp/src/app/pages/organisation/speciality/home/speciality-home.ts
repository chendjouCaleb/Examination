import {Component, Inject, Input, OnInit} from '@angular/core';
import {Speciality} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {ISpecialityService, SPECIALITY_SERVICE_TOKEN} from 'examination/app/components';
import {LevelSpecialityLoader} from 'examination/loaders';

@Component({
  templateUrl: 'speciality-home.html',
  selector: 'app-speciality-home'
})
export class SpecialityHome implements OnInit {

  @Input()
  speciality: Speciality;

  constructor(private currentItems: CurrentItems,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              @Inject(SPECIALITY_SERVICE_TOKEN)public service: ISpecialityService) {

  }

  async ngOnInit() {
     await this._levelSpecialityLoader.loadBySpeciality(this.speciality);
  }
}
