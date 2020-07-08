import {Component, OnInit} from '@angular/core';
import {AuthorizationManager} from 'examination/app/authorization';
import {UserLoader} from "examination/models";
import {TestHubListener} from "examination/listeners";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Examination';

  constructor(private _auth: AuthorizationManager,
              private _userLoader: UserLoader,
              private _testListener: TestHubListener) { }

  async ngOnInit() {
    const result = await this._auth.init();
    console.log('Authorization manager is ok!');

    this._userLoader.load(this._auth.user).then(data => {
      console.log('User data is loaded');
    });

    this._testListener.listen();
  }
}
