import {Component} from "@angular/core";
import {ExaminationSpeciality} from "@examination/entities";
import {CurrentItems} from "../../../current-items";

@Component({
  template: `
    <h3>Épreuves</h3>
    <div class="mt-2">
        <TestList [params]="{ examinationSpecialityId : examinationSpeciality.id}"></TestList>
    </div>
  `
})
export class ExaminationSpecialityTestsPage {
  examinationSpeciality: ExaminationSpeciality;

  constructor(private items: CurrentItems) {
    this.examinationSpeciality = items.get('examinationSpeciality');
  }
}
