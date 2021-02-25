import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[msIcon]'
})
export class MsIcon {
  @Input('msIcon')
  get icon(): string {return this._icon; }
  set icon(value: string) {
    if (!value) {
      throw new Error('Cannot set a null or empty icon');
    }
    if (this._icon) {
      this.host.classList.remove(`ms-Icon--${this._icon}`);
    }

    this.host.classList.add(`ms-Icon--${value}`);

    this._icon = value;
  }

  private _icon: string;

  constructor(private _elementRef: ElementRef<HTMLElement>) {
    this.host.classList.add('ms-Icon');
  }

  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }
}
