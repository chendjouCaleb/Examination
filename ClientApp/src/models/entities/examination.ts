import {Entity} from "./entity";
import {User} from "./user.entity";

export class Examination extends Entity<number>{

  userId: string;
  user: User;

  name: string;
  startDate: Date;
  endDate: Date;

  realStartDate: Date;
  realEndDate: Date;

  studentCount: number;
  reviewCount: number;
  reviewAverage
}
