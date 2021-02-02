import {Component, Inject, OnInit} from "@angular/core";
import {Speciality} from "examination/entities";
import {CurrentItems} from "examination/app/current-items";
import {ISpecialityService, SPECIALITY_SERVICE_TOKEN} from "examination/app/components";
import {LevelSpecialityLoader} from "examination/loaders";

@Component({
  templateUrl: 'speciality-home.page.html'
})
export class SpecialityHomePage implements OnInit{
  speciality: Speciality;

  constructor(private currentItems: CurrentItems,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              @Inject(SPECIALITY_SERVICE_TOKEN)public service: ISpecialityService) {
    this.speciality = this.currentItems.get('speciality');
  }

  async ngOnInit() {
     await this._levelSpecialityLoader.loadBySpeciality(this.speciality);
  }
}
