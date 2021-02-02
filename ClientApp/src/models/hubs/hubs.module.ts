import {NgModule} from "@angular/core";
import {TestGroupHub} from "./test-group.hub";
import {TestHub} from "./test.hub";
import {SchoolDestructorHub} from "./school-destructor.hub";

@NgModule({
  providers: [ TestGroupHub, TestHub, SchoolDestructorHub ]
})
export class HubsModule {}
