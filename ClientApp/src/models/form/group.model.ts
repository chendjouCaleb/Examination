import {IsEmail, IsNotEmpty, IsNumber, IsPositive, MinLength} from "class-validator";

export class GroupAddModel {
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

export class GroupEditModel {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  capacity: number;

  @IsNotEmpty()
  @MinLength(3)
  address: string;
}


export class GroupNameModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
