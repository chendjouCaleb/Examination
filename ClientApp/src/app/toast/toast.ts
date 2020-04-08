import {Injectable} from '@angular/core';
import {MsToastModule} from './toast.module';
import {MsToastOptions} from './toast-options';
import {ComponentType} from '@angular/cdk/overlay';

@Injectable({providedIn: 'root'})
export class MsToast {

  /**
   * Creates and dispatches a snack bar with a custom component for the content, removing any
   * currently opened snack bars.
   *
   * @param component Component to be instantiated.
   * @param options Extra configuration for the snack bar.
   */
  openFromComponent<T>(component: ComponentType<T>, options?: MsToastOptions):
    MsToastOptions<T> {

    return null;
  }
}
