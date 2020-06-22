import {Component, Input, OnInit} from "@angular/core";
import {Speciality, SpecialityHttpClient} from "examination/models";

@Component({
  selector: 'app-canGroupSpecialityAlert',

  template: `
      <msAlert *ngIf="countRemainingPlace < 0" theme="error" display="block">
          Il manque <b>{{-countRemainingPlace}}  places</b> dans les groupes de la specialité <b> {{speciality.name}}</b>.
          Veuillez ajouter des groupes supplémentaires.
      </msAlert>
  `

})
export class CanGroupSpecialityAlert implements OnInit{
  @Input()
  speciality: Speciality;

  countRemainingPlace: number = 0;

  constructor(private _httpClient: SpecialityHttpClient) {}

  async ngOnInit(): Promise<void> {
    this.countRemainingPlace = await this._httpClient.canGroup(this.speciality);
  }
}
