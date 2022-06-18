﻿import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsTooltipModule} from "@ms-fluent/components";
import {RouterModule} from "@angular/router";
import {ExaminationLevelCard} from "./card/examination-level-card";
import {ExaminationLevelList} from "./list/examination-level-list";

@NgModule({
  imports: [CommonModule, MsButtonModule, RouterModule, MsTooltipModule],
  declarations: [ ExaminationLevelCard, ExaminationLevelList ],
  exports: [ ExaminationLevelCard, ExaminationLevelList ],
})
export class ExaminationLevelModule { }
