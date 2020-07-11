import {Directive, HostBinding, Input} from "@angular/core";
import {msColor} from "./colors";


@Directive({
  selector: '[msColor]',
})
export class MsColorDirective {

  @Input('msColor')
  color: msColor;

  @HostBinding('class')
  get className(): string {
    return 'ms-fontColor-' + this.color;
  }
}
