import {Component, OnInit} from '@angular/core';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {MatDialog} from '@angular/material/dialog';
import {SpecialityAddComponent} from 'src/app/speciality';
import {Examination, Speciality, SpecialityHttpClient, SpecialityLoader} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";
import {MsfModal} from "fabric-docs";


@Component({
  templateUrl: 'speciality-list.page.html',
  selector: 'speciality-list'
})
export class SpecialityListPage implements OnInit {

  examination: Examination;
  specialities: List<Speciality>;

  constructor(private currentItems: CurrentItems, private _specialityLoader: SpecialityLoader,
              private _httpClient: SpecialityHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _dialog: MsfModal) {
    this.examination = currentItems.get('examination');
  }

  async ngOnInit() {
    this.specialities = await this._specialityLoader.loadByExamination(this.examination);
  }

  openAddSpecialityDialog() {
    const modalRef = this._dialog.open(SpecialityAddComponent);
    modalRef.componentInstance.examination = this.examination;
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.specialities.insert(0, result);
      }
    });
  }


  delete(speciality: Speciality) {
    const result = this._confirmation.open('Voulez-vous Supprimer cette spécialité?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(speciality.id);
      this.specialities.remove(speciality);
      this._alertEmitter.info('La spécialité a été supprimée!');
    });
  }
}
