import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Room} from 'examination/entities';
import {RoomHttpClient} from 'examination/models/http';
import {MsDialogRef} from '@ms-fluent/components';
import {ImageFormValue} from 'examination/controls';


@Component({
  templateUrl: 'room-image.html',
  selector: 'app-room-image, [app-room-image]',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomImage {
  @Input()
  room: Room;

  value: ImageFormValue;

  constructor(private _httpClient: RoomHttpClient,
              private _changeDetector: ChangeDetectorRef,
              private _modal: MsDialogRef<RoomImage>) {
  }


  async update() {

    console.log("change room image.");
    await this._httpClient.changeImage(this.room, this.value.blob);
    this.room.imageUrl = this.value.url;
    this._modal.close(true);
    console.log('Image updated');
  }

  onchange(value: ImageFormValue) {
    this.value = value;
    this._changeDetector.detectChanges();
  }

}
