import {Component} from '@angular/core';
import {Teacher} from 'examination/entities';
import {TeacherLoader} from 'examination/loaders';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'teacher.page-layout.html',
  selector: 'app-teacher-page-layout'
})
export class TeacherPageLayout {
  teacher: Teacher;

  constructor(private route: ActivatedRoute, private loader: TeacherLoader) {
    const id = + route.snapshot.paramMap.get('teacherId');

    this.loader.loadById(id).then(teacher => this.teacher = teacher);
  }
}
