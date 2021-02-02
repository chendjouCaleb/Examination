import {NgModule} from "@angular/core";
import {IdentityHttpClientModule} from "examination/models/http";
import {ClientLoader} from "./client.loader";
import {UserLoader} from "./user.loader";

@NgModule({
  imports: [ IdentityHttpClientModule],
  providers: [ ClientLoader, UserLoader]
})
export class IdentityLoaderModule {}
