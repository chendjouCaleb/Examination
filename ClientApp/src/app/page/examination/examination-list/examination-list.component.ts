import {Component, OnInit} from '@angular/core';
import {CurrentItems} from "examination/app/current-items";
import {Examination, ExaminationHttpClient, Organisation} from "examination/models";
import {ExaminationAddComponent} from "examination/app/examination";
import {Router} from "@angular/router";
import {List} from "@positon/collections";
import {MsfModal} from "fabric-docs";
import {ExaminationService} from "examination/app/examination/examination.service";

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.component.html',
  styleUrls: ['./examination-list.component.scss']
})
export class ExaminationListComponent implements OnInit {

  organisation: Organisation;
  examinations: List<Examination>;

  constructor(private currentItems: CurrentItems,
              private _dialog: MsfModal,
              public service: ExaminationService,
              private _httpClient: ExaminationHttpClient,
              private _router: Router) { }

  async ngOnInit() {
    this.organisation = this.currentItems.get("organisation");
    this.examinations = await this._httpClient.listAsync({organisationId: this.organisation.id});
  }
  openAddAdminDialog() {
    const modalRef = this._dialog.open<ExaminationAddComponent, Examination>(ExaminationAddComponent,
      {disableClose: true});
    modalRef.componentInstance.organisation = this.organisation;
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        //this._router.navigateByUrl(result.url);
        this.examinations.insert(0, result);
      }
    });
  }

}
