import {Department, Level, School} from "examination/entities";

export class CourseParams {
  isAuthorized: boolean;
  school?: School;
  department?: Department;
  level?: Level;
}
