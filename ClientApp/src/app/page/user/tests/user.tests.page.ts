import {Component} from "@angular/core";
import {User} from "examination/models";
import {CurrentItems} from "examination/app/current-items";

@Component({
  templateUrl: 'user.tests.page.html'
})
export class UserTestsPage {
  user: User;

  constructor(items: CurrentItems) {
    this.user = items.get('user');

    for (let test of this.user.tests) {
      if (this.user.testGroupCorrectors.containsIf(tgc => tgc.testGroup.testId === test.id)) {
        test.isCorrector = true;
      }

      if (this.user.testGroupSupervisors.containsIf(tgc => tgc.testGroup.testId === test.id)) {
        test.isSupervisor = true;
      }

      if (this.user.testGroupSecretaries.containsIf(tgc => tgc.testGroup.testId === test.id)) {
        test.isSecretary = true;
      }

      if (this.user.students.containsIf(s => !test.speciality && s.examinationId === test.examinationId)) {
        test.isStudent = true;
      }

      if (this.user.students.containsIf(s =>  test.speciality && s.specialityId === test.specialityId )) {
        test.isStudent = true;
      }
    }
  }
}
