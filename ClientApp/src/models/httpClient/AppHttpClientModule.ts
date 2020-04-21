import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {UserHttpClient} from "./user.http.client";
import {ClientHttpClient} from "./client.http.client";
import {OrganisationHttpClient} from "./organisation.httpClient";

@NgModule({
  imports: [ HttpClientModule],
  providers: [ UserHttpClient, ClientHttpClient, OrganisationHttpClient ]
})
export class AppHttpClientModule {

}
