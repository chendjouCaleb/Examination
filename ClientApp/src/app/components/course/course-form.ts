import {EvFormControl, EvFormGroup} from 'examination/controls';
import {Course, CourseAddModel, CourseEditModel, CourseLevelSpecialityAddModel} from 'examination/models';


export class CourseAddForm extends EvFormGroup<CourseAddModel> {
  constructor(value: any = {}) {
    super({
      name: new EvFormControl('name', ''),
      code: new EvFormControl('code', ''),
      radical: new EvFormControl('radical', value.radical),
      coefficient: new EvFormControl('coefficient', value.coefficient),
      description: new EvFormControl('description', ''),
      level: new EvFormControl('level', value.level),
      isGeneral: new EvFormControl('isGeneral', value.isGeneral),
      levelSpecialities: new EvFormControl('levelSpecialities', value.levelSpecialities),
    });
  }

  getModel(): CourseAddModel {
    const model = new CourseAddModel();
    model.name = this.controls.name.value;
    model.code = this.controls.code.value;
    model.radical = this.controls.radical.value;
    model.coefficient = +this.controls.coefficient.value;
    model.isGeneral = this.controls.isGeneral.value;
    model.description = this.controls.description.value;
    model.level = this.controls.level.value;
    model.levelSpecialities = this.controls.levelSpecialities.value;
    return model;
  }
}


export class CourseEditForm extends EvFormGroup<CourseEditModel> {
  constructor(value: Course = new Course()) {
    super({
      name: new EvFormControl('name', value.name),
      code: new EvFormControl('code', value.code),
      radical: new EvFormControl('radical', value.radical),
      coefficient: new EvFormControl('coefficient', value.coefficient),
      description: new EvFormControl('description', value.description)
    });
  }

  getModel(): CourseEditModel {
    const model = new CourseEditModel();
    model.name = this.controls.name.value;
    model.code = this.controls.code.value;
    model.radical = this.controls.radical.value;
    model.coefficient = +this.controls.coefficient.value;
    model.description = this.controls.description.value;
    return model;
  }
}


export class CourseLevelSpecialityAddForm extends EvFormGroup<CourseLevelSpecialityAddModel> {
  constructor(value: any = {}) {
    super({
      course: new EvFormControl('course', value.course),
      levelSpeciality: new EvFormControl('levelSpeciality', value.levelSpeciality),
    });
  }

  getModel(): CourseLevelSpecialityAddModel {
    const model = new CourseLevelSpecialityAddModel();
    model.course = this.controls.course.value;
    model.levelSpeciality = this.controls.levelSpeciality.value;
    return model;
  }
}
