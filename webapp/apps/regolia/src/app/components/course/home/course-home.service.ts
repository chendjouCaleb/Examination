import {Injectable} from "@angular/core";
import {Course} from "examination/entities";
import {CourseHome} from "./course-home";
import {MsDialog} from "@ms-fluent/components";

@Injectable()
export class CourseHomeService {

  constructor(private _modal: MsDialog) {}

  details(course: Course) {
    const modalRef = this._modal.open(CourseHome, {autoFocus: false});
    modalRef.componentInstance.course = course;
  }
}
