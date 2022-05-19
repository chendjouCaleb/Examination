import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraintInterface} from "class-validator";

export class IsLoginIdValidator implements ValidatorConstraintInterface{
  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    if(!value) {
      return false;
    }

    return true
  }


  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Identifiant de connexion incorrect.';
  }
}


export function IsLoginId(options?: ValidationOptions) {
  // tslint:disable-next-line:only-arrow-functions ban-types
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: IsLoginIdValidator
    });
  };
}
