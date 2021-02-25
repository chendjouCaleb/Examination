import {Directive, HostListener} from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[historyBack]'
})
export class HistoryBack {
  constructor(private location: Location) {}
  @HostListener('click')
  back() {
    this.location.back();
  }
}
