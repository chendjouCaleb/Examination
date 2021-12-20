import {YearStudent} from "@examination/entities";
import {Component, Input} from "@angular/core";
import {CourseHourService} from "@examination/components";


@Component({
  template: `
    
      <h3 class="my-2">Étudiants</h3>
  `,
  selector: 'SemesterCourseHoursPage'
})
export class YearStudentTests {
  @Input()
  yearStudent: YearStudent;

  constructor(private _service: CourseHourService) {

  }
}
