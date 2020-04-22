import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {ClientHttpClient} from "./client.http.client";
import {OrganisationHttpClient} from "./organisation.httpClient";
import {AdminHttpClient} from "./admin.httpClient";
import {UserHttpClient} from "./user.httpClient";

@NgModule({
  imports: [ HttpClientModule],
  providers: [ ClientHttpClient, OrganisationHttpClient, AdminHttpClient, UserHttpClient ]
})
export class AppHttpClientModule {

}
