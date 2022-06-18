import {Component, ElementRef, Inject, Input, ViewChild} from "@angular/core";
import {Room} from "examination/entities";
import {IRoomService, ROOM_SERVICE_TOKEN} from "@examination/components";
import {AlertEmitter, ImageForm, ImageFormDialog} from "src/controls";
import {RoomHttpClient} from "@examination/http";

@Component({
  templateUrl: 'room-home.html',
  selector: 'RoomHome'
})
export class RoomHome {
  @Input()
  room: Room;

  @ViewChild('imageElement')
  imageElement: ElementRef<HTMLImageElement>;

  constructor(@Inject(ROOM_SERVICE_TOKEN) private _service: IRoomService,
              private _imageForm: ImageFormDialog,
              private _alert: AlertEmitter,
              private _httpClient: RoomHttpClient) {
  }


  editRoom() {
    this._service.editRoom(this.room);
  }

  changeImage() {
    this._imageForm.open({ratio: 16/9}).subscribe(async value => {
      if (value.blob) {
        await this._httpClient.changeImage(this.room, value.blob);
        this.room.imageUrl = value.url;
        this.imageElement.nativeElement.src = value.url;

        this._alert.info('Photo mise à jour.');
      }
    })
  }

  delete() {
    this._service.deleteRoom(this.room).then(deleted => {
      if(deleted) {
        history.back();
      }
    });
  }
}
