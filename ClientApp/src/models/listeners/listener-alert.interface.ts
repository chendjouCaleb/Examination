import {InjectionToken} from "@angular/core";

export const LISTENER_ALERT_SERVICE_TOKEN =
  new InjectionToken<IListenerAlert>('LISTENER_ALERT_SERVICE_TOKEN');

export interface IListenerAlert {
  error(message: string, duration?: number);

  success(message: string, duration?: number);

  info(message: string, duration?: number);
}
