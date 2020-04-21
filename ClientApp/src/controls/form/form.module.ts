import {Component, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ControlErrorComponent} from './control.error.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [ControlErrorComponent],
  exports: [ControlErrorComponent, FormsModule, ReactiveFormsModule]
})
export class AppFormModule {

}
