import {IsNotEmpty} from 'class-validator';
import {IsFuture} from "../validators";

export class YearAddModel {
  @IsNotEmpty()
  @IsFuture()
  expectedStartDate: Date;

  @IsNotEmpty()
  @IsFuture()
  expectedEndDate: Date;
}
