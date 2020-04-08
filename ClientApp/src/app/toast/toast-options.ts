/** Injection token that can be used to access the data that was passed in to a snack bar. */
import {InjectionToken} from '@angular/core';

export const MS_TOAST_DATA = new InjectionToken<any>('MsToastData');

export type MsToastOrigin = 'bottom' | 'right';
export type MsToastTheme = 'error' | 'info' | 'success';

/**
 * Configuration used when opening a toast.
 */
export class MsToastOptions<D = any> {
  /** The length of time in milliseconds to wait before automatically dismissing the snack bar. */
  duration?: number = 0;

  /** Extra CSS classes to be added to the snack bar container. */
  panelClass?: string | string[];

  /** Data being injected into the child component. */
  data?: D | null = null;


  origin?: MsToastOrigin = 'right';

  theme?: MsToastTheme = 'info';
}
