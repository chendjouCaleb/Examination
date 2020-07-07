import {NgModule} from "@angular/core";
import {TestGroupHub} from "./test-group.hub";
import {TestHub} from "./test.hub";

@NgModule({
  providers: [ TestGroupHub, TestHub ]
})
export class HubsModule {}
