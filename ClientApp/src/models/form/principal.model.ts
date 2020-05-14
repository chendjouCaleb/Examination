import {IsNotEmpty, MinLength} from 'class-validator';

export class PrincipalAddModel {
  @IsNotEmpty()
  @MinLength(3)
  role: string;

  @IsNotEmpty()
  user: any;
}


export class PrincipalEditModel {
  @IsNotEmpty()
  @MinLength(3)
  role: string;
}
