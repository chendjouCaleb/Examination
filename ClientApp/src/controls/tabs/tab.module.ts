import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Tab} from './tab';
import {TabLabel} from './tab-label';
import {MatRippleModule} from '@angular/material/core';
import {ControlModule} from "../control.module";

@NgModule({
  imports: [CommonModule, MatRippleModule, ControlModule],
  declarations: [Tab, TabLabel],
  exports: [Tab, TabLabel]
})
export class MsfTabModule {
}
