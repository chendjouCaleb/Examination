import {Component, Input} from '@angular/core';
import {User} from 'examination/entities/identity';
import {MsPersonaSize} from '@ms-fluent/persona';

@Component({
  selector: 'user-persona',
  host: {
    class: 'd-flex'
  },
  template: `
      <ms-persona size="size40" *ngIf="user.hasImage" [imageUrl]="user.imageUrl"></ms-persona>
      <ms-persona size="size40" *ngIf="!user.hasImage" [text]="user.name"></ms-persona>
      <div class="ml-2">
          <div class="ms-fontWeight-semibold">{{user?.fullName}}</div>
          <div class="ms-fontSize-12" *ngIf="user?.username">@{{user?.username}}</div>
      </div>`
})
export class UserPersona {
  @Input()
  user: User;

  @Input()
  size: MsPersonaSize = 'size40';
}
