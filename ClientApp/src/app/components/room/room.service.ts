import {IRoomService} from './room.service.interface';
import {Injectable} from '@angular/core';
import {MsfModal} from 'fabric-docs';
import {Department, Level, Room, School} from 'examination/entities';
import {Confirmation} from 'examination/controls';
import {RoomAdd} from './add/room-add';
import {RoomHttpClient } from 'examination/models/http';
import {RoomEdit} from './edit/room-edit';
import {RoomDetails} from './details/room-details';


@Injectable()
export class RoomService implements IRoomService {
  constructor(private _modal: MsfModal,
              private _roomHttpClient: RoomHttpClient,
              private _confirmation: Confirmation) {
  }


  addRoom(school: School, department?: Department, level?: Level): Promise<Room> {
    const modalRef = this._modal.open(RoomAdd);
    modalRef.componentInstance.school = school;
    modalRef.componentInstance.department = department;
    modalRef.componentInstance.level = level;
    return modalRef.afterClosed().toPromise();
  }

  detailsRoom(room: Room) {
    const modalRef = this._modal.open(RoomDetails);
    modalRef.componentInstance.room = room;
  }

  editRoom(room: Room): Promise<void> {
    const modalRef = this._modal.open(RoomEdit);
    modalRef.componentInstance.room = room;
    return modalRef.afterClosed().toPromise();
  }


  deleteRoom(room: Room): Promise<boolean> {
    const m = `Supprimer la salle ${room.name}?`;
    const result = this._confirmation.open(m);

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._roomHttpClient.delete(room.id);
        room.school?.removeRoom(room);
        room.department?.removeRoom(room);
        resolve(true);
      });

      result.reject.subscribe(() => resolve(false));
    });
  }

}
