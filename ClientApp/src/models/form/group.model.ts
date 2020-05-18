import {IsEmail, IsNotEmpty, IsNumber, IsPositive, MinLength} from "class-validator";
import {Room, Speciality} from "examination/models";

export class GroupAddModel {
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  room: Room;

  @IsNotEmpty()
  speciality: Speciality;
}


export class GroupNameModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
