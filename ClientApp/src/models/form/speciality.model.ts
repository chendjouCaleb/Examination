import {IsNotEmpty, MinLength} from "class-validator";

export class SpecialityAddModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}


export class SpecialityNameModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
