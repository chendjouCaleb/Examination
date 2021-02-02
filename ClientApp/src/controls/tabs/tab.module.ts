import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsfIconModule} from 'fabric-docs';
import {Tab} from './tab';
import {TabLabel} from './tab-label';
import {MatRippleModule} from "@angular/material/core";

@NgModule({
  imports: [CommonModule, MsfIconModule, MatRippleModule],
  declarations: [Tab, TabLabel],
  exports: [Tab, TabLabel]
})
export class MsfTabModule {
}
