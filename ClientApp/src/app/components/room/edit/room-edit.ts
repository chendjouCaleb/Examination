import {Component, Input, OnInit, Optional} from '@angular/core';
import {RoomHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsfModalRef} from 'fabric-docs';
import {RoomLoader} from 'examination/loaders';
import {Room} from 'examination/entities';
import {RoomEditForm} from "../room-form";

@Component({
  templateUrl: 'room-edit.html',
  selector: 'app-room-edit'
})
export class RoomEdit implements OnInit{
  @Input()
  room: Room;

  form:RoomEditForm;

  constructor(private _httpClient: RoomHttpClient,
              private _alertEmitter: AlertEmitter,
              private _loader: RoomLoader,
              @Optional() private _modal: MsfModalRef<RoomEdit>) {
  }

  async ngOnInit() {
    this.form = new RoomEditForm(this.room);
  }

  async checkName() {
    const name = this.form.getControl('name');
    if (name.value.match(/^[a-zA-Z0-9]+$/)) {
      const room = await this._httpClient.findByName(this.room.school, name.value);
      if (room.id && room.id != this.room.id) {
        name.addError('Ce nom est déjà utilisé par une autre salle.');
      }
    }
  }


  async edit() {
    const room = await this._httpClient.update(this.room.id, this.form.getModel());
    this._alertEmitter.info(`La salle ${room.name} a été modifiée!`);
    Object.assign(this.room, this.form.getModel());

    await this._loader.load(room);
    if (this._modal) {
      this._modal.close(room);
    }
  }

  cancel() {
    if (this._modal) {
      this._modal.close( );
    }
  }
}
