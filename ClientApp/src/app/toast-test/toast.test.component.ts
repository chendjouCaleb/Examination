import {Component} from '@angular/core';

@Component({
  templateUrl: 'toast.test.component.html'
})
export class ToastTestComponent {
  hide: boolean = false;

  date = new Date();

  toggle() {
    this.hide = !this.hide;
  }
}
