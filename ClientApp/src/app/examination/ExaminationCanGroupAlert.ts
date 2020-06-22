import {Component, Input, OnInit} from "@angular/core";
import {Examination, ExaminationHttpClient} from "examination/models";

@Component({
  selector: 'app-canGroupExaminationAlert',

  template: `
      <msAlert *ngIf="countRemainingPlace < 0" theme="error" display="block">
          Il manque <b>{{-countRemainingPlace}}  places</b> pour les groupes sans spécialités.
          Veuillez ajouter des groupes supplémentaires sans spécialité.
      </msAlert>
  `

})
export class CanGroupExaminationAlert implements OnInit{
  @Input()
  examination: Examination;

  countRemainingPlace: number = 0;

  constructor(private _httpClient: ExaminationHttpClient) {}

  async ngOnInit(): Promise<void> {
    this.countRemainingPlace = await this._httpClient.canGroupNonSpecialityStudents(this.examination);
    
  }
}
