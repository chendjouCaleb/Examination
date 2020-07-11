import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";

import {MsfModalRef} from "fabric-docs";
import {PaperPeriodForm} from "../form";
import {Paper} from "examination/entities";
import {PaperHttpClient} from "examination/models";


@Component({
  templateUrl: 'paper-edit-date.component.html'
})
export class PaperEditDateComponent implements OnInit {
  form: PaperPeriodForm;

  @Input()
  paper: Paper;

  constructor(private _httpClient: PaperHttpClient,
              private _dialogRef: MsfModalRef<PaperEditDateComponent>,
              private _alertEmitter: AlertEmitter) { }

  async ngOnInit() {
    this.form = new PaperPeriodForm({
      day: this.paper.startDate
    });
  }


  async edit() {
    const formModel = this.form.getModel();
    let paper = await this._httpClient.changeDates(this.paper, formModel.body);

    this.paper.startDate = formModel.body.startDate;
    this.paper.endDate = formModel.body.endDate;
    this._alertEmitter.info(`L'horaire de composition ont été modifié.`);
    this._dialogRef.close(paper);
  }
}
