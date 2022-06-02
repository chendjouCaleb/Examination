import {Component, Input, ViewEncapsulation} from "@angular/core";
import {User} from "examination/entities";

@Component({
  templateUrl: 'user-persona.html',
  selector: 'UserPersona',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'd-flex'
  },
})
export class UserPersona {
  @Input()
  user: User;
}
