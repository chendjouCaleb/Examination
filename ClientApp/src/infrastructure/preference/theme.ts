import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class Theme {
  modes: string[] = [ 'light', 'dark'];
  themes: string[] = ['red', 'blue', 'green', 'pink' ];
}
