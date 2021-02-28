import {EvFormControl, EvFormGroup} from 'examination/controls';
import {Teacher} from 'examination/entities';
import {CourseTeacherAddBodyModel} from 'examination/models';
import {IsNotEmpty} from 'class-validator';

export class CourseTeacherAddFormModel {
  @IsNotEmpty()
  teacher: Teacher;
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

export class CourseTeacherAddForm extends EvFormGroup<CourseTeacherAddFormModel> {
  constructor(value: any = {}) {
    super({
      teacher: new EvFormControl('teacher', null),
      lecture: new EvFormControl('lecture', true),
      tutorial: new EvFormControl('tutorial', false),
      isPrincipal: new EvFormControl('isPrincipal', value.isPrincipal)
    });
  }

  getModel(): CourseTeacherAddFormModel {
    const model = new CourseTeacherAddFormModel();
    model.teacher = this.controls.teacher.value;
    model.lecture = this.controls.lecture.value;
    model.tutorial = this.controls.tutorial.value;
    model.isPrincipal = this.controls.isPrincipal.value;
    return model;
  }
}



