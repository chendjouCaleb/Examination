import {EvFormControl, EvFormGroup} from 'examination/controls';
import {Course, CourseHourAddBodyModel, CourseTeacher, Room} from 'examination/models';
import {IsNotEmpty} from 'class-validator';
import {DayOfWeek, LocalTime} from '@js-joda/core';

export class CourseHourAddFormModel {
  @IsNotEmpty()
  courseTeacher: CourseTeacher;

  @IsNotEmpty()
  course: Course;

  @IsNotEmpty()
  room: Room;

  type: 'lecture' | 'tutorial';

  @IsNotEmpty()
  dayOfWeek: DayOfWeek;

  @IsNotEmpty()
  startHour: LocalTime;

  @IsNotEmpty()
  endHour: LocalTime;

  get body(): CourseHourAddBodyModel {
    return {
      lecture: this.type === 'lecture',
      dayOfWeek: this.dayOfWeek.value(),
      endHour: this.endHour.toString(),
      startHour: this.startHour.toString()
    }
  }
}

export class CourseHourAddForm extends EvFormGroup<CourseHourAddFormModel> {
  constructor(value: any = {}) {
    super({
      courseTeacher: new EvFormControl('courseTeacher', value.courseTeacher),
      course: new EvFormControl('course', value.course),
      room: new EvFormControl('room', value.room),
      type: new EvFormControl('type', value.type),
      tutorial: new EvFormControl('lecture', value.tutorial),
      dayOfWeek: new EvFormControl('dayOfWeek', value.dayOfWeek),
      startHour: new EvFormControl('startHour', value.startHour),
      endHour: new EvFormControl('endHour', value.endHour)
    });
  }

  getModel(): CourseHourAddFormModel {
    const model = new CourseHourAddFormModel();
    model.courseTeacher = this.controls.courseTeacher.value;
    model.course = this.controls.course.value;
    model.room = this.controls.room.value;
    model.type = this.controls.type.value;
    model.dayOfWeek = this.controls.dayOfWeek.value;
    model.startHour = this.controls.startHour.value;
    model.endHour = this.controls.endHour.value;
    return model;
  }
}



