import {Component} from '@angular/core';
import {Student} from 'examination/entities';
import {StudentLoader} from 'examination/loaders';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'student.page-layout.html',
  selector: 'app-student-page-layout'
})
export class StudentPageLayout {
  student: Student;

  constructor(private route: ActivatedRoute, private loader: StudentLoader) {
    const id = + route.snapshot.paramMap.get('studentId');

    this.loader.loadById(id).then(student => this.student = student);
  }
}
