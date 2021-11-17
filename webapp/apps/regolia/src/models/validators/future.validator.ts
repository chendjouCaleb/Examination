import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraintInterface} from "class-validator";

export class IsFutureValidator implements ValidatorConstraintInterface{
  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    if(!value) {
      return false;
    }

    return new Date(value).getTime() < Date.now()
  }


  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'La date doit être dans le futur.';
  }
}


export function IsFuture(options?: ValidationOptions) {
  // tslint:disable-next-line:only-arrow-functions ban-types
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: IsFutureValidator
    });
  };
}
