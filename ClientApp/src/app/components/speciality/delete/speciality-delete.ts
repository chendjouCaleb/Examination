import {Component, Input} from '@angular/core';
import {Speciality} from 'examination/entities';
import {SpecialityHttpClient} from 'examination/models/http';
import {MsfModalRef} from 'fabric-docs';

@Component({
  templateUrl: 'speciality-delete.html'
})
export class SpecialityDelete {
  @Input()
  speciality: Speciality;

  constructor(private _httpClient: SpecialityHttpClient,
              private _modalRef: MsfModalRef<SpecialityDelete>) {
  }

  async delete() {
    await this._httpClient.delete(this.speciality.id);

    if (this._modalRef) {
      this._modalRef.close(true);
    }
  }
}
