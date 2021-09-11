import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class PreviousLocation {
  private _previousUrl: string;
  get previousUrl(): string {
    return this._previousUrl;
  }


  constructor(private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this._previousUrl = event.url;
      })
  }
}
