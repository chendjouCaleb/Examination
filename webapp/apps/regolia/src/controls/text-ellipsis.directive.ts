import {AfterViewInit, Directive, ElementRef, HostBinding, Input} from "@angular/core";
import {msFontSize} from "./font-size";

@Directive({
  selector: '[ms-text-ellipsis], [MsTextEllipsis]',
})
export class MsTextEllipsisDirective implements AfterViewInit {

  constructor(private _hostRef: ElementRef<HTMLElement>) {
  }

  ngAfterViewInit() {
    const nameHost = this._hostRef.nativeElement;
    const width = nameHost.getBoundingClientRect().width;

    nameHost.style.width = width + 'px';
    nameHost.style.whiteSpace = 'nowrap';
    nameHost.style.textOverflow = 'ellipsis';
    nameHost.style.overflow = 'hidden';
  }
}
