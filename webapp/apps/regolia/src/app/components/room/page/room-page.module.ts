import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsPivotModule} from "@ms-fluent/components";
import {RoomPage} from "./room-page";

@NgModule({
  imports: [ CommonModule, MsButtonModule, MsPivotModule ],
  declarations: [ RoomPage],
  exports: [ RoomPage ]
})
export class RoomPageModule {

}
