import {Component, OnInit} from '@angular/core';
import {AuthorizationManager} from 'examination/app/authorization';
import {UserLoader} from "examination/models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Examination';

  constructor(private _auth: AuthorizationManager,
              private _userLoader: UserLoader) { }

  async ngOnInit() {
    const result = await this._auth.init();
    console.log('Authorization manager is ok!');

    this._userLoader.load(this._auth.user).then(data => {
      console.log(data)
    })
  }
}
