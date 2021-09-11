import {Component, Input, OnInit} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {Room, RoomLoader, School, Test, TestGroupHttpClient, TestGroupLoader} from 'src/models';
import {MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'test-group-add.html'
})
export class TestGroupAdd implements OnInit {

  @Input()
  test: Test;

  room: Room;
  constructor(private _httpClient: TestGroupHttpClient,
              private _roomLoader: RoomLoader,
              private _loader: TestGroupLoader,
              private _dialogRef: MsDialogRef<TestGroupAdd>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    await this._roomLoader.loadBySchool(this.school);
  }

  async add() {
    const testGroup = await this._httpClient.addTestGroup(this.test, this.room);
    await this._loader.load(testGroup);
    this.test.testGroupCount++;
    this.test.testGroups?.insert(0, testGroup);
    this._alertEmitter.info(`Le groupe a été ajouté.`);
    this._dialogRef.close(testGroup);
  }

  get school(): School {
    return this.test.course.level.department.school;
  }
}
