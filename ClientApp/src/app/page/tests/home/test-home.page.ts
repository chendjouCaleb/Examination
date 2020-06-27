import {Component} from '@angular/core';
import {Test} from 'src/models';
import {CurrentItems} from '../../../current-items';

@Component({
  templateUrl: 'test-home.page.html',
  selector: 'app-test-home'
})
export class TestHomePage {
  test: Test;

  constructor(currentItems: CurrentItems) {
    this.test = currentItems.get('test');
  }
}
