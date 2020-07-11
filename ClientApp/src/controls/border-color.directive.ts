import {Directive, HostBinding, Input} from "@angular/core";
import {msColor} from "./colors";


@Directive({
  selector: '[msBorderColor]',
})
export class MsBorderColorDirective {

  @Input('msBorderColor')
  color: msColor;

  @HostBinding('class')
  get className(): string {
    return 'ms-borderColor-' + this.color;
  }
}
