import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsDialogModule} from "@ms-fluent/components";
import {LevelSpecialityDelete} from "./delete/level-speciality-delete";
import {LevelSpecialityService} from "./level-speciality-service";

@NgModule({
  imports: [ CommonModule, MsDialogModule, MsButtonModule ],
  declarations: [ LevelSpecialityDelete ],
  providers: [ LevelSpecialityService ]
})
export  class LevelSpecialityModule {

}
