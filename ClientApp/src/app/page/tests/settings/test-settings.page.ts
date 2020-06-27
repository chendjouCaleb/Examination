import {Component} from '@angular/core';
import {Test} from 'src/models';
import {CurrentItems} from '../../../current-items';

@Component({
  templateUrl: 'test-settings.page.html',
  selector: 'app-test-settings'
})
export class TestSettingsPage {
  test: Test;

  constructor(currentItems: CurrentItems) {
    this.test = currentItems.get('test');
  }
}
