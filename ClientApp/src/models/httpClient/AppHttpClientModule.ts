import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {UserHttpClient} from "./user.http.client";
import {ClientHttpClient} from "./client.http.client";

@NgModule({
  imports: [ HttpClientModule],
  providers: [ UserHttpClient, ClientHttpClient ]
})
export class AppHttpClientModule {

}
