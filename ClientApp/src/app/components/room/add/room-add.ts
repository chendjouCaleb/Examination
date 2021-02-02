import {Component, Input, OnInit} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {Department, DepartmentLoader, Level, LevelLoader, RoomHttpClient, RoomLoader, School} from "src/models";
import {MsfModalRef} from "fabric-docs";
import {RoomAddForm} from "../room-form";
import {List} from "@positon/collections";


@Component({
  templateUrl: 'room-add.html',
  selector: 'app-room-add'
})
export class RoomAdd implements OnInit {
  form: RoomAddForm;
  userId: string;

  @Input()
  school: School;

  @Input()
  department: Department;

  @Input()
  level: Level;

  constructor(private _httpClient: RoomHttpClient,
              private _loader: RoomLoader,
              private _levelLoader: LevelLoader,
              private _departmentLoader: DepartmentLoader,
              private _dialogRef: MsfModalRef<RoomAdd>,
              private _alertEmitter: AlertEmitter) {
  }

  async ngOnInit(): Promise<void> {
    if (this.school) {
      await this._departmentLoader.loadBySchool(this.school);
    }

    if(this.department) {
      await this._levelLoader.loadByDepartment(this.department);
      this.levels = this.department.levels;
    }

    if(this.level) {
      // this.department = this.level.department;
      // this.school = this.department.school;
    }

    this.form = new RoomAddForm({school: this.school, department: this.department, level: this.level});
  }

  async checkName() {
    const name = this.form.getControl("name");
    if (name.value && name.value.match(/^[a-zA-Z0-9 ]+$/)) {
      const room = await this._httpClient.findByName(this.school, name.value);
      if (room && room.id) {
        name.addError("Le nom est déjà utilisé par une salle");
      }
    }
  }


  async add() {
    const model = this.form.getModel();
    let room = await this._httpClient.addRoom(model.body, model.params);
    await this._loader.load(room);
    this.school?.addRoom(room);
    this.department?.addRoom(room);
    this.level?.addRoom(room);
    this._alertEmitter.info(`La salle ${room.name} a été ajoutée.`);
    if (this._dialogRef) {
      this._dialogRef.close(room);
    }
  }

  cancel() {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
  }

  levels: List<Level>;

  async updateLevels(department: Department) {
    if (department) {
      await this._levelLoader.loadByDepartment(department);
      this.levels = department.levels;

    } else {
      this.levels = null;
    }
  }
}
