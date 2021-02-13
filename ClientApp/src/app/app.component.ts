import {Component, OnInit} from '@angular/core';
import {AuthorizationManager} from 'examination/app/authorization';
import {RouterOutlet} from '@angular/router';
import {slideInAnimation} from 'examination/app/route-animations';

@Component({
  selector: 'app-root',
  template: `<ng-container *ngIf="initialized">' 
    <div><router-outlet #outlet="outlet"> </router-outlet></div>
    </ng-container> `,
  animations: [ slideInAnimation ]

})
export class AppComponent implements OnInit {
  title = 'Examination';

  initialized: boolean = false;

  constructor(private _auth: AuthorizationManager ) {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  async ngOnInit() {
    await this._auth.init();
    this.initialized = true;
    console.log('Authorization manager is ok!');
  }
}
