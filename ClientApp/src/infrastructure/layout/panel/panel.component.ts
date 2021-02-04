import {Component, ElementRef, Input} from '@angular/core';
import {getDocumentMaxZIndex} from '../../dom-helpers';

@Component({
  templateUrl: 'panel.component.html',
  selector: 'app-panel',
  styleUrls: ['panel.component.scss'],
  host: {
    '(swipeleft)': 'swipe()'
  }
})
export class PanelComponent {
  @Input()
  title: string;

  /**
   * The unique identifier of the panel.
   */
  @Input()
  name: string;

  isOpen: boolean = false;

  // tslint:disable-next-line:variable-name
  constructor(private _elementRef: ElementRef<HTMLElement>) {
  }

  swipe() {
    alert('swipe')
  }
  open() {
    this.isOpen = true;
    this._elementRef.nativeElement.style.zIndex = getDocumentMaxZIndex() + 1 + '';
    this._elementRef.nativeElement.classList.add('panel-visible');
  }

  close() {
    this.isOpen = false;
    this._elementRef.nativeElement.classList.remove('panel-visible');
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}
