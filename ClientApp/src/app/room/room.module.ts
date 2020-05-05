import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsfButtonModule, MsfPivotModule} from 'fabric-docs';
import {RoomLayoutComponent} from './layout/room-layout.component';
import {RoomAddComponent} from './add/room-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ControlModule} from '../../controls/control.module';
import {OrganisationModule} from '../organisation';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ControlModule, MsfButtonModule,
    MsfPivotModule, OrganisationModule],
  declarations: [RoomLayoutComponent, RoomAddComponent],
  exports: [RoomLayoutComponent, RoomAddComponent]
})
export class RoomModule {
}
