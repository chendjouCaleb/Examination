import {Component, Input, OnDestroy} from '@angular/core';
import {timer} from 'rxjs';
import {timeInterval, pluck, take} from 'rxjs/operators';

export interface BeforeOnDestroy {
  ngxBeforeOnDestroy();
}

// tslint:disable-next-line:ban-types
type NgxInstance = BeforeOnDestroy & Object;
// tslint:disable-next-line:ban-types
type Descriptor = TypedPropertyDescriptor<Function>;
type Key = string | symbol;

export function BeforeOnDestroy(target: NgxInstance, key: Key, descriptor: Descriptor) {
  return {
    // tslint:disable-next-line:only-arrow-functions
    value: async function(...args: any[]) {
      await target.ngxBeforeOnDestroy();
      return descriptor.value.apply(target, args);
    }
  };
}
