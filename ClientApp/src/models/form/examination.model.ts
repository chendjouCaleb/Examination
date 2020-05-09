import {IsDateString, IsNotEmpty, MinLength} from "class-validator";

export class ExaminationAddModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  requireSpeciality: boolean;

  @IsNotEmpty()
  expectedStartDate: any;

  @IsNotEmpty()
  expectedEndDate: any;

}


export class ExaminationNameModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}

export class ExaminationDateModel {
  @IsNotEmpty()
  date: string;
}
