import {Component} from '@angular/core';
import {StudentAdd} from '../student-add';

@Component({
  templateUrl: 'student-add-home.html',
  selector: 'student-add-home'
})
export class StudentAddHome {

  constructor(public parent: StudentAdd) {

  }

  next() {
    this.parent.stepper.next();
  }
}
