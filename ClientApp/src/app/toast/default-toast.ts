import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';


@Component({
  selector: 'msDefaultToast',
  templateUrl: 'default-toast.html',
  styleUrls: ['default-toast.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ms-toast ms-toast-shrink'
  }
})
export class MsDefaultToast implements AfterViewInit, OnInit, AfterContentInit, OnDestroy {


  @Input()
  icon: string = 'CheckMark';

  @Input()
  iconImage: string;

  @Input()
  title: string;

  @Input()
  message: string;

  @Input()
  closeButton: boolean = true;

  @Input()
  confirmButton: boolean = false;

  @Input()
  confirmButtonText: string = 'Ok';

  @Input()
  cancelButton: boolean = false;

  get actionButton(): boolean {
    return this.cancelButton || this.confirmButton;
  }

  @Input()
  bgColor: string = 'Gray40';

  @Input()
  date: Date  = new Date();


  expandable: boolean = true;

  @ViewChild('body')
  _body: ElementRef<HTMLElement>;

  @ViewChild('background')
  _background: ElementRef<HTMLElement>;

  _bodyHeight: number = 0;

  _expanded: boolean = false;

  toggle() {
    if (this._expanded) {
      this.shrink();
    } else {
      this.expand();
    }
  }

  expand() {
    this._expanded = true;
    this._body.nativeElement.style.height = `${this._bodyHeight}px`;
  }

  shrink() {
    this._expanded = false;
    this._body.nativeElement.style.height = '20px';
  }


  _hover: boolean = false;

  // @HostListener('mouseover')
  // mouseover() {
  //   this._hover = true;
  //   this._background.nativeElement.style.opacity = '0.9';
  // }
  //
  // @HostListener('mouseout')
  // mouseout() {
  //   this._hover = false;
  //   this._background.nativeElement.style.opacity = '0.8';
  // }

  constructor(private _elementRef: ElementRef<HTMLElement>, private _changeDetector: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this._bodyHeight = this._body.nativeElement.getBoundingClientRect().height;
    if (this._bodyHeight < 25) {
      this.expandable = false;
    } else {
      this.shrink();
    }
    this._changeDetector.detectChanges();
  }


  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
  }

  async ngOnDestroy() {
    await sleep(10000);

    console.log('destoru');
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
