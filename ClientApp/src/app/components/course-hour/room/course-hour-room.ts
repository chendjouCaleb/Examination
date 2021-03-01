import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseHourHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsfModalRef} from 'fabric-docs';
import {CourseHourLoader, CourseLoader, CourseTeacherLoader, RoomLoader} from 'examination/loaders';
import {CourseHour, Room, School} from 'examination/entities';

@Component({
  templateUrl: 'course-hour-room.html',
  selector: 'app-course-hour-room'
})
export class CourseHourRoom implements OnInit {

  @Input()
  courseHour: CourseHour;

  rooms: Room[];
  room: Room;

  constructor(private _httpClient: CourseHourHttpClient,
              private _courseTeacherLoader: CourseTeacherLoader,
              private _roomLoader: RoomLoader,
              private _courseLoader: CourseLoader,
              private _alertEmitter: AlertEmitter,
              private _loader: CourseHourLoader,
              @Optional() private _modal: MsfModalRef<CourseHourRoom>) {
  }

  async ngOnInit() {
    await this._roomLoader.loadBySchool(this.school);
    this.rooms = this.school.rooms.toArray();
    this.room = this.rooms.find(r => r.id === this.courseHour.roomId);
  }


  async change() {
    const oldRoom = this.courseHour.room;

    await this._httpClient.changeRoom(this.courseHour, this.room);
    this.courseHour.room = this.room;
    oldRoom.courseHours?.remove(this.courseHour);
    this.room.courseHours?.add(this.courseHour);


    this._alertEmitter.info(`La salle a été changé!`);
    if (this._modal) {
      this._modal.close(this.courseHour.room);
    }
  }

  get school(): School {
    return this.courseHour.room.school;
  }
}
