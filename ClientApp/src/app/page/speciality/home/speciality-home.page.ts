import {Component, OnInit} from '@angular/core';
import {Speciality, SpecialityHttpClient} from "examination/models";
import {CurrentItems} from "examination/app/current-items";

@Component({
  templateUrl: 'speciality-home.page.html',
  selector: 'app-speciality-home'
})
export class SpecialityHomePage implements OnInit{
  speciality: Speciality;

  countRemainingPlace: number = 0;

  constructor(currentItems: CurrentItems, private _httpClient: SpecialityHttpClient ) {
    this.speciality = currentItems.get('speciality');
  }

  async ngOnInit(): Promise<void> {
    this.countRemainingPlace = await this._httpClient.canGroup(this.speciality);
  }
}
