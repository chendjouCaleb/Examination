import {Component, Inject, Input, OnInit} from '@angular/core';
import {Student} from 'examination/entities';
import {MS_DIALOG_DATA, MsCollectionSlideDescription, MsDialogRef} from '@ms-fluent/components';
import {Observable, Subject} from 'rxjs';

@Component({
  templateUrl: 'student-slide.html',
  selector: 'student-slide'
})
export class StudentSlide implements OnInit {
  @Input()
  students: Student[];

  description: MsCollectionSlideDescription<Student>;

  constructor(private dialog: MsDialogRef<StudentSlide>,
              @Inject(MS_DIALOG_DATA) data) {
    const students = data.students;
    this.description = new StudentSlideDescriptor(students);
  }

  ngOnInit(): void {

  }
}

export class StudentSlideDescriptor implements MsCollectionSlideDescription<Student>{
  constructor(public students: Student[]) {}

  change(): Observable<void> {
    return new Subject<void>().asObservable();
  }

  find(index: number): Promise<Student> {
    return Promise.resolve(this.students[index]);
  }

  length(): number {
    return this.students.length;
  }
}
