import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestDetailsComponent } from './test-details/test-details.component';
import {MsfButtonModule, MsfIconModule, MsfPersonaModule} from "fabric-docs";



@NgModule({
  declarations: [TestDetailsComponent],
  exports: [ TestDetailsComponent],
  imports: [
    CommonModule, MsfIconModule, MsfPersonaModule, MsfButtonModule
  ]
})
export class TestModule { }
