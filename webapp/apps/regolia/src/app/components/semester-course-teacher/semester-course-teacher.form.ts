import {EvFormControl, EvFormGroup} from 'examination/controls';
import {CourseTeacherAddBodyModel, SemesterTeacher} from 'examination/models';
import {IsNotEmpty} from 'class-validator';

export class SemesterCourseTeacherAddFormModel {
  @IsNotEmpty()
  semesterTeacher: SemesterTeacher;
  lecture: boolean;
  tutorial: boolean;
  isPrincipal: boolean;

  get body(): CourseTeacherAddBodyModel {
    return {
      tutorial: this.tutorial,
      lecture: this.lecture,
      isPrincipal: this.isPrincipal
    }
  }
}

export class SemesterCourseTeacherAddForm extends EvFormGroup<SemesterCourseTeacherAddFormModel> {
  constructor(value: any = {}) {
    super({
      semesterTeacher: new EvFormControl('semesterTeacher', null),
      lecture: new EvFormControl('lecture', true),
      tutorial: new EvFormControl('tutorial', false),
      isPrincipal: new EvFormControl('isPrincipal', value.isPrincipal)
    });
  }

  getModel(): SemesterCourseTeacherAddFormModel {
    const model = new SemesterCourseTeacherAddFormModel();
    model.semesterTeacher = this.controls.semesterTeacher.value;
    model.lecture = this.controls.lecture.value;
    model.tutorial = this.controls.tutorial.value;
    model.isPrincipal = this.controls.isPrincipal.value;
    return model;
  }
}



