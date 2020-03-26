import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExaminationLayoutComponent} from "./examination-layout.component";
import {LayoutModule} from "src/infrastructure/public_api";
import {MsfIconModule} from "fabric-docs";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [ ExaminationLayoutComponent ],
  exports: [ ExaminationLayoutComponent ],
  imports: [ CommonModule, LayoutModule, MsfIconModule, RouterModule ]
})
export class ExaminationLayoutModule { }
