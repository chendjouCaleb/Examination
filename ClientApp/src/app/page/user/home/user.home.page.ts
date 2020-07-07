import {Component} from "@angular/core";
import {User} from "examination/models";
import {CurrentItems} from "examination/app/current-items";

@Component({
  templateUrl: 'user.home.page.html'
})
export class UserHomePage {
  user: User;

  constructor(items: CurrentItems) {
    this.user = items.get('user');
  }
}
