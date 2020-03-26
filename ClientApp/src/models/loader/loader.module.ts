import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ClientLoader} from "./client.loader";


@NgModule({
  imports: [CommonModule],
  providers: [ ClientLoader ]
})
export class LoaderModule { }
