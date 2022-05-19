import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraintInterface} from "class-validator";

export class IsNameValidator implements ValidatorConstraintInterface{
  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    if(!value) {
      return false;
    }

    if(value.length < 3) {
      return false;
    }

    if(value.toString().match(/^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i)) {
      return false;
    }

    return true
  }


  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Nom incorrect.';
  }
}


export function IsName(options?: ValidationOptions) {
  // tslint:disable-next-line:only-arrow-functions ban-types
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: IsNameValidator
    });
  };
}
