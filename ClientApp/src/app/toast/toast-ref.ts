/** Event that is emitted when a snack bar is dismissed. */
import {Observable, Subject} from 'rxjs';

export interface MsToastDismiss {
  /** Whether the snack bar was dismissed using the action button. */
  dismissedByAction: boolean;
}


/**
 * Reference to a toast dispatched from the snack bar service.
 */
export class MsToastRef<T> {
  /** The instance of the component making up the content of the snack bar. */
  instance: T;

  /** Subject for notifying the user that the snack bar has been dismissed. */
  private readonly _afterDismissed = new Subject<MsToastDismiss>();

  /** Subject for notifying the user that the snack bar has opened and appeared. */
  private readonly _afterOpened = new Subject<void>();

  /** Subject for notifying the user that the snack bar action was called. */
  private readonly _onAction = new Subject<void>();

  /**
   * Timeout ID for the duration setTimeout call. Used to clear the timeout if the snackbar is
   * dismissed before the duration passes.
   */
  private _durationTimeoutId: number;

  /** Whether the snack bar was dismissed using the action button. */
  private _dismissedByAction = false;


  /** Dismisses the snack bar. */
  dismiss(): void {}


  /** Marks the snackbar action clicked. */
  dismissWithAction(): void {}

  /** Dismisses the snack bar after some duration */
  _dismissAfter(duration: number): void {}


  /** Marks the snackbar as opened */
  _open(): void {}


  /** Cleans up the DOM after closing. */
  private _finishDismiss(): void {}


  /** Gets an observable that is notified when the snack bar is finished closing. */
  afterDismissed(): Observable<MsToastDismiss> {
    return this._afterDismissed.asObservable();
  }

  /** Gets an observable that is notified when the snack bar has opened and appeared. */
  afterOpened(): Observable<void> {
    return null;
  }

  /** Gets an observable that is notified when the snack bar action is called. */
  onAction(): Observable<void> {
    return this._onAction.asObservable();
  }
}
