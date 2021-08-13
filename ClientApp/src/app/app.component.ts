import {Component, OnInit} from '@angular/core';
import {AuthorizationManager} from 'examination/app/authorization';
import {RouterOutlet} from '@angular/router';
import {slideInAnimation} from 'examination/app/route-animations';

@Component({
  selector: 'app-root',
  template: `
      <div *ngIf="!initialized" class="flex-center-screen" style="width: 100vw;">
          <div>
              <div class="ms-fontSize-24 mb-2 ms-fontColor-gray160 text-center">Régolia</div>
              <msSpinnerInlineDot style="width: 100%"></msSpinnerInlineDot>
          </div>
      </div>
      <ng-container *ngIf="initialized">' 
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
    try {
      await this._auth.init();
      this.initialized = true;
      console.log('Authorization manager is ok!');
    } catch (e) {
      this.initialized = true;
    }
  }
}
