import {Entity} from "./entity";
import {Corrector} from "./corrector.entity";
import {Test} from "./test.entity";
import {Student} from "./student.entity";
import { TestSupervisor } from './supervisor.entity';
import {List} from "@positon/collections";
import {Contest} from "./contest.entity";
import {PaperReview} from "./review.entity";

export class Paper extends Entity<number> {
  score: number;
  isPresent: boolean;
  anonymity: string;
  tableNumber: number;
  startDate: number;
  endDate: number;

  corrector: Corrector;
  correctorId: number;

  test: Test;
  testId: number;

  student: Student;
  studentId: number;

  testSupervisor: TestSupervisor;
  testSupervisorId: number;

  contests = new List<Contest>();
  ContestCount: number;

  reviews = new List<PaperReview>();
  reviewCount: number;

  paperFiles = new List<PaperFile>();
  paperFileCount: number;

}


export class PaperFile extends Entity<number> {
  name: string;
  corrected: boolean;
  index: number;
  url: string;

  paper: Paper;
  paperId: number;
}
