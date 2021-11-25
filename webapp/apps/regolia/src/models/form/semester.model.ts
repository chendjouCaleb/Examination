import {IsNotEmpty} from 'class-validator';
import {IsFuture} from "../validators";

export class SemesterAddModel {
  @IsNotEmpty()
  @IsFuture()
  expectedStartDate: Date;

  @IsNotEmpty()
  @IsFuture()
  expectedEndDate: Date;
}
