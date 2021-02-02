import {Component, Directive, ElementRef, HostBinding, Input, OnInit, ViewEncapsulation} from "@angular/core";


export type msAlertTheme = 'info' | 'success' | 'severeWarning' | 'error';
export type msAlertDisplay = 'inline-block' | 'inline' | 'block';


@Directive({
  selector: '[msAlertFooter]',
  host: { 'class': 'ms-alert-footer'}
})
export class MsAlertFooter {}

@Directive({
  selector: '[msAlertButton]',
  host: { 'class': 'ms-alert-button'}
})
export class MsAlertButton {
  @Input()
  action: boolean = false;

  @HostBinding('class')
  get className(): string {
    if(this.action){
      return  `ms-fontColor-${this.alert.theme} ms-borderColor-${this.alert.theme}`;
    }
    return  '';
  }
    constructor(private alert: MsAlert) {
      if(!alert){
        throw new Error("The MsAlertButton should be inside a MsAlert")
      }
    }
}

@Component({
  selector: "msAlert",
  templateUrl: 'alert.html',
  styleUrls: [ 'alert.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class MsAlert implements OnInit{
  @Input()
  theme: msAlertTheme = 'info';

  @HostBinding("style.display")
  @Input()
  display: msAlertDisplay = 'block';

  @HostBinding('class')
  className: string;

  @Input()
  icon: boolean = true;

  @Input()
  closeButton: boolean = true;


  get visible(): boolean { return this._visible}
  private _visible: boolean = false;

  private _height;

  constructor(private _elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.className = `ms-alert ms-fontColor-${this.theme} ms-bgColor-${this.theme}`;
    this._height = this.element.getBoundingClientRect().height;
  }

  get element(): HTMLElement {
    return this._elementRef.nativeElement;
  }


  hide():Promise<void> {
    return new Promise<void>(resolve => {

      this.element.animate([
        {height: `${this._height}px`},
        {height: '0'}
      ], {duration: 200, fill: 'both'})
        .onfinish = () => {
        this.element.style.display = 'none';
        this._visible = false;
        resolve();
      }
    })
  }

  show():Promise<void> {
    return new Promise<void>(resolve => {
      this.element.style.display = this.display;
      this.element.animate([
        {height: '0'},
        {height: `${this._height}px`}
        ], {duration: 200, fill: 'both'})
        .onfinish = () => {
        this._visible = true;
        resolve();
      }
    })
  }

  get iconName(): string {
    if(this.theme === 'info' ) {
      return 'Info'
    }
    if(this.theme === 'success'){
      return 'Completed'
    }
    if(this.theme === 'severeWarning') {
      return 'Warning12';
    }

    return 'ErrorBadge'
  }
}
