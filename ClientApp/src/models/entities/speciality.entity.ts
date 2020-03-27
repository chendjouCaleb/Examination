import {Entity} from "./entity";
import {Examination} from "./examination";

export class Speciality extends Entity<number>{
  name: string;
  examination: Examination;
  examinationId: number;

  studentCount: number;
  testCount: number;
}
