import {Directive, HostBinding, Input} from "@angular/core";
import {msFontWeight} from "./font-size";

@Directive({
  selector: '[msFontWeight]',
})
export class MsFontWeightDirective {

  @Input('msFontWeight')
  weight: msFontWeight;

  @HostBinding('class')
  get className(): string {
    return 'ms-fontWeight-' + this.weight;
  }
}
