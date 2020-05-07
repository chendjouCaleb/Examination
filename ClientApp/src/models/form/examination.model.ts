import {IsNotEmpty, IsNumber, IsPositive, MinLength} from "class-validator";

export class ExaminationAddModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  requireSpeciality: boolean;

  @IsNotEmpty()
  expectedStartDate: Date;

  @IsNotEmpty()
  expectedEndDate: Date;

}



export class ExaminationNameModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
