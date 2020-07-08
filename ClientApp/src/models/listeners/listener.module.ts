import {NgModule} from "@angular/core";
import {TestHubListener} from "./test.listener";
import {TestGroupHubListener} from "./test-group.listener";

@NgModule({
  providers: [TestHubListener, TestGroupHubListener]
})
export class HubListenerModule {}
