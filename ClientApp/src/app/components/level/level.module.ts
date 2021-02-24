import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule,   MsfSelectModule } from 'examination/controls';
import { MsfMenuModule, MsfModalModule} from 'fabric-docs';
import {LevelAdd} from './add/level-add';
import {LevelService} from './level.service';
import {LEVEL_SERVICE_TOKEN} from './level.service.interface';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LevelResolver} from './level.resolver';
import {LevelDelete} from './delete/level-delete';
import {MsButtonModule} from '@ms-fluent/button';
import {LevelSpecialityAdd} from './speciality/level-speciality-add';

@NgModule({
  imports: [CommonModule, ControlModule, MsfModalModule, MsfMenuModule, FormsModule,
    ReactiveFormsModule, AppFormModule, MsfSelectModule, MsButtonModule],
  declarations: [LevelAdd, LevelDelete, LevelSpecialityAdd],
  exports: [LevelAdd, LevelDelete, LevelSpecialityAdd],
  providers: [LevelResolver, LevelService, {provide: LEVEL_SERVICE_TOKEN, useExisting: LevelService}]
})
export class LevelModule {

}
