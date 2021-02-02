import {NgModule} from '@angular/core';
import {UserHttpClient} from './user.httpClient';
import {ClientHttpClient} from "./client.httpClient";

@NgModule({
  providers: [UserHttpClient, ClientHttpClient]
})
export class IdentityHttpClientModule {

}
