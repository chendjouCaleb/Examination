import {Entity} from "./entity";

export class Test extends Entity<string>{
  name: string;
  code: string;
  room: string;
  coefficient: number;
  expectedStartDate: Date;
  expectedEndDate: Date;

 realStartDate: Date;
 realEndDate: Date;


}
