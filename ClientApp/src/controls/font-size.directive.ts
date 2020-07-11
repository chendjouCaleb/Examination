import {Directive, HostBinding, Input} from "@angular/core";
import {msFontSize} from "./font-size";

@Directive({
  selector: '[msFontSize]',
})
export class MsFontSizeDirective {

  @Input('msFontSize')
  size: msFontSize;

  @HostBinding('class')
  get className(): string {
    return 'ms-fontSize-' + this.size;
  }
}
