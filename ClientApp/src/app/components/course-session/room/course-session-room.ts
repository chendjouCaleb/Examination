import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseSessionHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';
import {CourseSessionLoader, CourseLoader, CourseTeacherLoader, RoomLoader} from 'examination/loaders';
import {CourseSession, Room, School} from 'examination/entities';

@Component({
  templateUrl: 'course-session-room.html',
  selector: 'app-course-session-room'
})
export class CourseSessionRoom implements OnInit {

  @Input()
  courseSession: CourseSession;

  rooms: Room[];
  room: Room;

  constructor(private _httpClient: CourseSessionHttpClient,
              private _courseTeacherLoader: CourseTeacherLoader,
              private _roomLoader: RoomLoader,
              private _courseLoader: CourseLoader,
              private _alertEmitter: AlertEmitter,
              private _loader: CourseSessionLoader,
              @Optional() private _modal: MsDialogRef<CourseSessionRoom>) {
  }

  async ngOnInit() {
    await this._roomLoader.loadBySchool(this.school);
    this.rooms = this.school.rooms.toArray();
    this.room = this.rooms.find(r => r.id === this.courseSession.roomId);
  }


  async change() {
    const oldRoom = this.courseSession.room;

    await this._httpClient.changeRoom(this.courseSession, this.room);
    this.courseSession.room = this.room;
    oldRoom.courseSessions?.remove(this.courseSession);
    this.room.courseSessions?.add(this.courseSession);


    this._alertEmitter.info(`La salle a été changé!`);
    if (this._modal) {
      this._modal.close(this.courseSession.room);
    }
  }

  get school(): School {
    return this.courseSession.room.school;
  }
}
