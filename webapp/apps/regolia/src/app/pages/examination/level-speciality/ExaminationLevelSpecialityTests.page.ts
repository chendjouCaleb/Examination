import {Component} from "@angular/core";
import {ExaminationLevelSpeciality} from "@examination/entities";
import {CurrentItems} from "../../../current-items";

@Component({
  template: `
      <h3>Épreuves</h3>
      <div class="mt-2">
          <TestList [params]="{examinationLevelSpecialityId: examinationLevelSpeciality.id}"></TestList>
      </div>
  `
})
export class ExaminationLevelSpecialityTestsPage {
  examinationLevelSpeciality: ExaminationLevelSpeciality;

  constructor(private items: CurrentItems) {
    this.examinationLevelSpeciality = items.get('examinationLevelSpeciality');
  }
}
