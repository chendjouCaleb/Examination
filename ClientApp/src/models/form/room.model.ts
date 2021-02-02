import {IsNotEmpty, IsNumber, IsPositive, MinLength} from "class-validator";
import {Department, Level, School} from "examination/entities";

export interface RoomAddBody {
  name: string;
  capacity: number;
  address: string;
}

export interface RoomAddParams {
  departmentId?: number;
  schoolId?: number;
  levelId?: number;
}

export class RoomAddModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  capacity: number;

  @IsNotEmpty()
  @MinLength(3)
  address: string;

  school: School;

  department: Department;

  level: Level;

  get body(): RoomAddBody {
    return {
      name: this.name,
      capacity: this.capacity,
      address: this.address
    }
  }

  get params(): RoomAddParams {
    if (this.level) {
      return {levelId: this.level.id};
    }
    if (this.department) {
      return {departmentId: this.department.id};
    }
    return {schoolId: this.school.id};
  }
}

export class RoomEditModel {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  capacity: number;

  @IsNotEmpty()
  @MinLength(3)
  address: string;
}


export class RoomNameModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
