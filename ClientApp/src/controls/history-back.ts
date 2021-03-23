import {Directive, HostListener, Input} from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[historyBack]'
})
export class HistoryBack {
  @Input('historyBack')
  step: number = 1;

  constructor(private location: Location) {}

  @HostListener('click')
  back() {
    this.location.back();
  }
}
