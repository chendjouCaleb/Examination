import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: 'breadcrumb.html',
  styleUrls: ['breadcrumb.scss']
})
export class Breadcrumb {
  constructor(private router: Router) {
  }

  @Input()
  items: BreadcrumbItem[] = [];

  back() {
    history.back();
  }

  canBack() {
    return history.length > 0;
  }

  _itemClick(item: BreadcrumbItem) {
    if (item.url) {
      this.router.navigateByUrl(item.url);
    }
  }
}

export interface BreadcrumbItem {
  name: string;
  url?: string;
}
