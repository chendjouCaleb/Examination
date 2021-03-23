import {EvFormControl, EvFormGroup} from 'examination/controls';
import {
  Course,
  CourseHour,
  CourseSessionAddBodyModel,
  CourseSessionHourBodyModel, CourseSessionReportBodyModel,
  CourseTeacher,
  Room
} from 'examination/models';
import {IsNotEmpty} from 'class-validator';
import {LocalTime} from '@js-joda/core';

export class CourseSessionHourFormModel {
  @IsNotEmpty()
  day: Date;

  @IsNotEmpty()
  startHour: LocalTime;

  @IsNotEmpty()
  endHour: LocalTime;

  get body(): CourseSessionHourBodyModel {
    const startDate = new Date(this.day);
    startDate.setHours(this.startHour.hour(), this.startHour.minute());
    const endDate = new Date(this.day);
    endDate.setHours(this.endHour.hour(), this.endHour.minute());

    return {
      expectedStartDate: startDate,
      expectedEndDate: endDate
    }
  }
}

export class CourseSessionAddFormModel {
  @IsNotEmpty()
  courseTeacher: CourseTeacher;

  @IsNotEmpty()
  course: Course;

  @IsNotEmpty()
  room: Room;

  courseHour: CourseHour;

  type: 'lecture' | 'tutorial';

  @IsNotEmpty()
  day: Date;

  @IsNotEmpty()
  startHour: LocalTime;

  @IsNotEmpty()
  endHour: LocalTime;

  @IsNotEmpty()
  objective: string;

  get body(): CourseSessionAddBodyModel {
    const startDate = new Date(this.day);
    startDate.setHours(this.startHour.hour(), this.startHour.minute());
    const endDate = new Date(this.day);
    endDate.setHours(this.endHour.hour(), this.endHour.minute());

    return {
      lecture: this.type === 'lecture',
      objective: this.objective,
      expectedStartDate: startDate,
      expectedEndDate: endDate
    }
  }
}

export class CourseSessionReportFormModel {
  @IsNotEmpty()
  report: string;

  presence: number;

  @IsNotEmpty()
  day: Date;

  @IsNotEmpty()
  startHour: LocalTime;

  @IsNotEmpty()
  endHour: LocalTime;


  get body(): CourseSessionReportBodyModel {
    const startDate = new Date(this.day);
    startDate.setHours(this.startHour.hour(), this.startHour.minute());
    const endDate = new Date(this.day);
    endDate.setHours(this.endHour.hour(), this.endHour.minute());

    return {
      presence: this.presence,
      report: this.report,
      startDate,
      endDate
    }
  }
}

export class CourseSessionHourForm extends EvFormGroup<CourseSessionHourFormModel> {
  constructor(value: any = {}) {
    super({
      day: new EvFormControl('day', value.day),
      startHour: new EvFormControl('startHour', value.startHour),
      endHour: new EvFormControl('endHour', value.endHour)
    });
  }

  getModel(): CourseSessionHourFormModel {
    const model = new CourseSessionHourFormModel();
    model.startHour = this.controls.startHour.value;
    model.endHour = this.controls.endHour.value;
    model.day = this.controls.day.value;
    return model;
  }
}


export class CourseSessionAddForm extends EvFormGroup<CourseSessionAddFormModel> {
  constructor(value: any = {}) {
    super({
      courseTeacher: new EvFormControl('courseTeacher', value.courseTeacher),
      course: new EvFormControl('course', value.course),
      room: new EvFormControl('room', value.room),
      type: new EvFormControl('type', value.type),
      day: new EvFormControl('day', value.day),
      objective: new EvFormControl('objective', value.objective),
      courseHour: new EvFormControl('courseHour', value.courseHour),
      startHour: new EvFormControl('startHour', value.startHour),
      endHour: new EvFormControl('endHour', value.endHour)
    });
  }

  getModel(): CourseSessionAddFormModel {
    const model = new CourseSessionAddFormModel();
    model.courseTeacher = this.controls.courseTeacher.value;
    model.course = this.controls.course.value;
    model.room = this.controls.room.value;
    model.type = this.controls.type.value;
    model.day = this.controls.day.value;
    model.objective = this.controls.objective.value;
    model.courseHour = this.controls.courseHour.value;
    model.startHour = this.controls.startHour.value;
    model.endHour = this.controls.endHour.value;
    return model;
  }
}



export class CourseSessionReportForm extends EvFormGroup<CourseSessionReportFormModel> {
  constructor(value: any = {}) {
    super({
      report: new EvFormControl('report', value.report),
      presence: new EvFormControl('presence', value.presence),
      day: new EvFormControl('day', value.day),
      startHour: new EvFormControl('startHour', value.startHour),
      endHour: new EvFormControl('endHour', value.endHour)
    });
  }

  getModel(): CourseSessionReportFormModel {
    const model = new CourseSessionReportFormModel();
    model.report = this.controls.report.value;
    model.presence = this.controls.presence.value;
    model.day = this.controls.day.value;
    model.startHour = this.controls.startHour.value;
    model.endHour = this.controls.endHour.value;
    return model;
  }
}



