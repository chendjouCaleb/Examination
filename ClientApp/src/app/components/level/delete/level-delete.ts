import {Component, Input} from '@angular/core';
import {Level} from 'examination/entities';
import {LevelHttpClient} from 'examination/models/http';
import {MsfModalRef} from 'fabric-docs';

@Component({
  templateUrl: 'level-delete.html'
})
export class LevelDelete {
  @Input()
  level: Level;

  constructor(private _httpClient: LevelHttpClient,
              private _modalRef: MsfModalRef<LevelDelete>) {
  }

  async delete() {
    await this._httpClient.delete(this.level.id);
    this.level.department.levels.removeIf(l => l.id === this.level.id);

    if (this._modalRef) {
      this._modalRef.close(true);
    }
  }
}
