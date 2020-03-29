import {Entity} from "./entity";
import {Supervisor, TestSupervisor} from "./supervisor.entity";
import {List} from "@positon/collections";

export class Test extends Entity<string>{
  name: string;
  code: string;
  room: string;
  coefficient: number;
  expectedStartDate: Date;
  expectedEndDate: Date;

 realStartDate: Date;
 realEndDate: Date;

 isDone: boolean;
 isCorrected: boolean;


 testsSupervisors: List<TestSupervisor> = new List<TestSupervisor>();

 get supervisors(): List<Supervisor> {
   return this.testsSupervisors.convertAll<Supervisor>(ts => ts.supervisor);
 }

}
