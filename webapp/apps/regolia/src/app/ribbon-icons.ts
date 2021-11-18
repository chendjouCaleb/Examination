import {InjectionToken} from "@angular/core";

export const MENU_ICONS_VALUES = {
  course: '/assets/icon/books.png',
  courseHour: '/assets/icon/calendrier.png',
  courseSession: '/assets/icon/schedule.svg',
  room: '/assets/icon/classroom.png',
  application: '/assets/icon/student-application.png',
  student: '/assets/icon/eleve.png',
  year: '/assets/icon/year.png',
  semester: '/assets/icon/semester.png',
  examination: '/assets/icon/examination.png'
};

export const MENU_ICONS = new InjectionToken('MENU_ICONS');
