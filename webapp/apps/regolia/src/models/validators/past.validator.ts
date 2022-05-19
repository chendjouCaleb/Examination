import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraintInterface} from "class-validator";

export class IsPastValidator implements ValidatorConstraintInterface{
  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    if(!value) {
      return false;
    }

    return new Date(value).getTime() > Date.now()
  }


  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'La date doit être passée.';
  }
}


export function IsPast(options?: ValidationOptions) {
  // tslint:disable-next-line:only-arrow-functions ban-types
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: IsPastValidator
    });
  };
}
