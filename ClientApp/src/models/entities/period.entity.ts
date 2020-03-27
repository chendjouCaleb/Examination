export interface IPeriod {
  expectedStartDate: Date;
  expectedEndDate: Date;

  realStartDate: Date;
  realEndDate: Date;

  state: string;
}
