import {IsEmail, IsNotEmpty, IsNumber, IsPositive, MinLength} from "class-validator";

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
