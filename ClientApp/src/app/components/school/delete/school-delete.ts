import {Component, Input} from '@angular/core';
import {School} from 'examination/entities';
import {SchoolHttpClient} from 'examination/models/http';
import {MsDialogRef} from '@ms-fluent/components';
import {SchoolDestructorHub} from 'examination/hubs';

@Component({
  templateUrl: 'school-delete.html'
})
export class SchoolDelete {
  @Input()
  school: School;

  eventLogs: string[] = [];

  constructor(private _httpClient: SchoolHttpClient,
              private _hub: SchoolDestructorHub,
              private _modalRef: MsDialogRef<SchoolDelete>) {

    _hub.log.subscribe((e) => {
      if (e.school.id === this.school.id) {
        this.eventLogs.push(e.message);
        console.log(e.message)
      }
    })
  }

  async delete() {
    await this._httpClient.delete(this.school.id);

    if (this._modalRef) {
      this._modalRef.close(true);
    }
  }
}
