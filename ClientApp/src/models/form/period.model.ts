import {IsNotEmpty} from 'class-validator';

export class PeriodModel {
  @IsNotEmpty()
  startDate: any;

  @IsNotEmpty()
  endDate: any;
}

export class ExpectedPeriodModel {
  @IsNotEmpty()
  expectedStartDate: any;

  @IsNotEmpty()
  expectedEndDate: any;
}
