import {Component, OnInit} from '@angular/core';
import {AuthorizationManager} from './authorization/authorization-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Examination';

  constructor(private _auth: AuthorizationManager) { }

  async ngOnInit() {
    const result = await this._auth.init();
    console.log('Authorization manager is ok!')
  }
}
