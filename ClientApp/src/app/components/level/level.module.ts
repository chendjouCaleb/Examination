import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule,   MsfSelectModule } from 'examination/controls';
import {MsfButtonModule, MsfMenuModule, MsfModalModule} from 'fabric-docs';
import {LevelAdd} from './add/level-add';
import {LevelService} from './level.service';
import {LEVEL_SERVICE_TOKEN} from './level.service.interface';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LevelResolver} from './level.resolver';
import {LevelDelete} from './delete/level-delete';

@NgModule({
  imports: [CommonModule, ControlModule, MsfModalModule, MsfButtonModule, MsfMenuModule, FormsModule,
    ReactiveFormsModule, AppFormModule, MsfSelectModule ],
  declarations: [LevelAdd, LevelDelete],
  exports: [LevelAdd, LevelDelete],
  providers: [LevelResolver, LevelService, {provide: LEVEL_SERVICE_TOKEN, useExisting: LevelService}]
})
export class LevelModule {

}
