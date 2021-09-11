import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule,   MsfSelectModule } from 'examination/controls';
import {LevelAdd} from './add/level-add';
import {LevelService} from './level.service';
import {LEVEL_SERVICE_TOKEN} from './level.service.interface';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LevelResolver} from './level.resolver';
import {LevelDelete} from './delete/level-delete';
import {LevelSpecialityAdd} from './speciality/level-speciality-add';
import {MsButtonModule, MsContextMenuModule, MsDialogModule, MsSelectModule} from '@ms-fluent/components';

@NgModule({
  imports: [CommonModule, ControlModule, MsDialogModule, MsContextMenuModule, FormsModule,
    ReactiveFormsModule, AppFormModule, MsSelectModule, MsButtonModule],
  declarations: [LevelAdd, LevelDelete, LevelSpecialityAdd],
  exports: [LevelAdd, LevelDelete, LevelSpecialityAdd],
  providers: [LevelResolver, LevelService, {provide: LEVEL_SERVICE_TOKEN, useExisting: LevelService}]
})
export class LevelModule {

}
