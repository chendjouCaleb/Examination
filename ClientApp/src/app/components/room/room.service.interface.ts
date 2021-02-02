import {Department, Level, Room, School} from 'examination/entities';
import {InjectionToken} from '@angular/core';

export const ROOM_SERVICE_TOKEN =
  new InjectionToken<IRoomService>('ROOM_SERVICE_TOKEN');

export interface IRoomService {
  addRoom(school: School, department?: Department, level?: Level): Promise<Room>;

  deleteRoom(room: Room): Promise<boolean>;

  editRoom(room: Room): Promise<void>;

  detailsRoom(room: Room);
}
