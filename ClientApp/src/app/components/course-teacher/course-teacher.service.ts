import {ICourseTeacherService} from './course-teacher.service.interface';
import {Injectable} from '@angular/core';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {CourseTeacherHttpClient} from 'examination/models/http';
import {Course, CourseTeacher} from 'examination/entities';
import {CourseTeacherAdd} from './add/course-teacher-add';
import {CourseTeacherDetails} from './details/course-teacher-details';
import {MsDialog} from '@ms-fluent/components';


@Injectable()
export class CourseTeacherService implements ICourseTeacherService {
  constructor(private _modal: MsDialog,
              private _courseTeacherHttpClient: CourseTeacherHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation) {
  }

  addCourseTeacher(course: Course): Promise<CourseTeacher> {
    const modalRef = this._modal.open(CourseTeacherAdd, {autoFocus: false});
    modalRef.componentInstance.course = course;

    return modalRef.afterClosed().toPromise();
  }

  deleteCourseTeacher(courseTeacher: CourseTeacher): Promise<boolean> {
    const m = `Enlever l'enseignant ${courseTeacher.teacher.user.fullName}?`;
    const result = this._confirmation.open(m);

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._courseTeacherHttpClient.delete(courseTeacher.id);
        courseTeacher.teacher.courseTeachers?.remove(courseTeacher);
        courseTeacher.course.courseTeachers?.remove(courseTeacher);
        this._alertEmitter.info(`L'enseignant ${courseTeacher.teacher.user.fullName} a été enlevé du cours!`);
        resolve(true);
      });
    });
  }

  isLecture(courseTeacher: CourseTeacher): Promise<boolean> {
    return undefined;
  }

  isPrincipal(courseTeacher: CourseTeacher): Promise<boolean> {
    return undefined;
  }

  isTutorial(courseTeacher: CourseTeacher): Promise<boolean> {
    return undefined;
  }

  details(courseTeacher: CourseTeacher) {
    const modalRef = this._modal.open(CourseTeacherDetails, { autoFocus: false});
    modalRef.componentInstance.courseTeacher = courseTeacher;
  }

}
