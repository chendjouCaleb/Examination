import {NgModule} from "@angular/core";
import {IdentityManager} from "./identity-manager";
import {HttpClientModule} from "@angular/common/http";
import {IsAuthGuard, IsNotAuthGuard} from "./authentication-guards";

@NgModule({
  imports: [ HttpClientModule ],
  providers: [ IdentityManager, IsAuthGuard, IsNotAuthGuard ],
})
export class IdentityModule {

}
