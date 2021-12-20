import {SemesterStudent} from "@examination/entities";
import {Component, Input} from "@angular/core";


@Component({
  template: `
      <h3 class="my-2">Étudiants</h3>
  `,
  selector: 'SemesterStudentTests'
})
export class SemesterStudentTests {
  @Input()
  semesterStudent: SemesterStudent;
}
