import {NgModule} from "@angular/core";
import {TestHubListener} from "./test.listener";

@NgModule({
  providers: [TestHubListener]
})
export class HubListenerModule {}
