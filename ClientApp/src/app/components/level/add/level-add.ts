import {Component, Input, OnInit, Optional} from '@angular/core';
import {LevelAddForm} from 'examination/app/components/level/form';
import {LevelHttpClient, SpecialityHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsfModalRef} from 'fabric-docs';
import {LevelLoader, LevelSpecialityLoader} from 'examination/loaders';
import {Department, Speciality} from 'examination/entities';
import {List} from "@positon/collections";

@Component({
  templateUrl: 'level-add.html',
  selector: 'app-level-add'
})
export class LevelAdd implements OnInit {
  @Input()
  department: Department;

  form = new LevelAddForm();

  specialities = new List<Speciality>();

  constructor(private _httpClient: LevelHttpClient,
              private _specialityHttpClient: SpecialityHttpClient,
              private _alertEmitter: AlertEmitter,
              private _loader: LevelLoader,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              @Optional() private _modal: MsfModalRef<LevelAdd>) {
  }

  async ngOnInit(): Promise<void> {
    this.specialities = await this._specialityHttpClient.listByDepartment(this.department);
  }

  async add() {
    const params = this.form.getModel().params;
    const level = await this._httpClient.addLevel(this.department, params);
    await this._loader.load(level);

    await this._levelSpecialityLoader.loadByLevel(level);
    this.department.addLevelSpecialities(level.levelSpecialities);
    this.department.levels.add(level);
    this._alertEmitter.info(`Le niveau ${level.index + 1} a été ajouté!`);

    if (this._modal) {
      this._modal.close(level);
    }
  }
}
