import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class AdminAddModel {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()

  @MinLength(3)
  role: string;
}


export class AdminEditModel {
  @IsNotEmpty()
  @MinLength(3)
  role: string;
}
