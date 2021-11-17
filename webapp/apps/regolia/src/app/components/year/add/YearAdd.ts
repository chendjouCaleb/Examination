import {Component, Input} from "@angular/core";
import {YearAddForm} from "../form";
import {School} from "examination/entities";
import {YearHttpClient} from "examination/models/http";
import {MsDialogRef} from "@ms-fluent/components";

@Component({
  templateUrl: 'YearAdd.html',
  selector: 'YearAdd'
})
export class YearAdd {
  @Input()
  school: School;

  form = new YearAddForm();

  constructor(private httpClient: YearHttpClient, private dialog: MsDialogRef<YearAdd>) {}

  add() {}
}
