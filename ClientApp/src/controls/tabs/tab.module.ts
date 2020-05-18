import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsfIconModule} from 'fabric-docs';
import {Tab} from './tab';
import {TabLabel} from './tab-label';

@NgModule({
  imports: [CommonModule, MsfIconModule],
  declarations: [Tab, TabLabel],
  exports: [Tab, TabLabel]
})
export class MsfTabModule {
}
