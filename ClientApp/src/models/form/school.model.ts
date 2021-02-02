import {IsAlpha, IsAlphanumeric, IsNotEmpty, MinLength} from "class-validator";

export class SchoolAddModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsAlpha()
  acronym;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  identifier: string;

  @IsNotEmpty()

  @MinLength(3)
  address: string;
}


export class SchoolEditModel {
  @IsNotEmpty()
  @MinLength(3)
  name: string;


  @IsNotEmpty()
  @MinLength(3)
  address: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  acronym;
}

export class SchoolIdentifierModel {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  identifier: string;
}
