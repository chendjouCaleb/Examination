import {Component, ElementRef, Input, ViewEncapsulation} from "@angular/core";

@Component({
  selector: 'app-icon, [app-icon]',
  template: `<i class="ms-Icon ms-Icon--{{icon}} ms-fontColor-{{fontColor}}" ></i>`,
  styleUrls: ['icon.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'app-icon'
  }

})
export class Icon{
  @Input()
  get bgColor(): string { return this._bgColor};

  set bgColor(value: string) {
    this._elementRef.nativeElement.classList.remove(`ms-bgColor-${this._bgColor}`);
    this._elementRef.nativeElement.classList.add(`ms-bgColor-${value}`);
    this._bgColor = value;
  }
  _bgColor: string = 'sharedGreenCyan10';

  @Input()
  fontColor = 'white';

  @Input()
  icon: string = 'CheckMark';

  constructor(private _elementRef: ElementRef<HTMLElement>) {
    this.bgColor = this._bgColor;
  }
}
