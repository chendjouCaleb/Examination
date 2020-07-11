import {Directive, HostBinding, Input} from "@angular/core";
import {msColor} from "./colors";


@Directive({
  selector: '[msBgColor]',
})
export class MsBgColorDirective {

  @Input('msBgColor')
  color: msColor;

  @HostBinding('class')
  get className(): string {
    return 'ms-bgColor-' + this.color;
  }
}
