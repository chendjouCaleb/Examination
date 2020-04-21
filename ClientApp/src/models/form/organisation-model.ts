import {IsAlpha, IsAlphanumeric, IsNotEmpty, MinLength} from "class-validator";

export class OrganisationAddModel {
  @IsNotEmpty()
  @IsAlpha("fr-FR")
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  identifier: string;

  @IsNotEmpty()
  @IsAlphanumeric("fr-FR")
  @MinLength(3)
  address: string;
}


export class OrganisationEditModel {
  @IsNotEmpty()
  @IsAlpha("fr-FR")
  @MinLength(3)
  name: string;


  @IsNotEmpty()
  @IsAlphanumeric("fr-FR")
  @MinLength(3)
  address: string;
}

export class OrganisationIdentifierModel {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(3)
  identifier: string;
}
