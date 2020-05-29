import {IsNotEmpty} from 'class-validator';


export class PaperReportModel {
  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  anonymity: string;
}
