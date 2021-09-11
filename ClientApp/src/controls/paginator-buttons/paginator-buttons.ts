import {Component, Input} from '@angular/core';
import {MsPaginator} from '@ms-fluent/components';

@Component({
  selector: 'ms-paginatorButtons, msPaginatorButtons',
  templateUrl: 'paginator-buttons.html',
  styleUrls: ['paginator-buttons.scss'],
  host: {
    'class': 'ms-paginatorButtons'
  }
})
export class MsPaginatorButtons<T = any> {
  @Input()
  paginator: MsPaginator<T>;

}
