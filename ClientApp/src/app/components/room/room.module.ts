import {NgModule} from '@angular/core';
import {RoomAdd} from './add/room-add';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppFormModule, ControlModule, MsfSelectModule} from 'examination/controls';
import {MsfMenuModule, MsfModalModule} from 'fabric-docs';
import {RoomEdit} from './edit/room-edit';
import {RoomService} from './room.service';
import {ROOM_SERVICE_TOKEN} from './room.service.interface';
import {RoomResolver} from './room.resolver';
import {RoomList} from './list/room-list';
import {RoomDetails} from './details/room-details';
import {MsButtonModule} from '@ms-fluent/button';
import {MsTableModule} from '@ms-fluent/table';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppFormModule, MsButtonModule,
    MsfSelectModule, MsTableModule, ControlModule, MsfMenuModule, MsfModalModule],
  declarations: [RoomAdd, RoomEdit, RoomList, RoomDetails],
  exports: [RoomAdd, RoomEdit, RoomList, RoomDetails],
  providers: [RoomService, RoomResolver, {provide: ROOM_SERVICE_TOKEN, useExisting: RoomService}]
})
export class RoomModule {
}

