import {Component, Input, OnInit, Optional} from '@angular/core';
import {LevelSpecialityHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';
import {LevelLoader, LevelSpecialityLoader} from 'examination/loaders';
import {Level, Speciality} from 'examination/entities';
import {List} from '@positon/collections';

@Component({
  templateUrl: 'speciality-level-add.html',
  selector: 'app-speciality-level-add'
})
export class SpecialityLevelAdd implements OnInit {
  level: Level;

  @Input()
  speciality: Speciality;

  levels = new List<Level>();

  constructor(private _httpClient: LevelSpecialityHttpClient,
              private _levelLoader: LevelLoader,
              private _alertEmitter: AlertEmitter,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              @Optional() private _modal: MsDialogRef<SpecialityLevelAdd>) {
  }

  async ngOnInit(): Promise<void> {
    await this._levelLoader.loadByDepartment(this.speciality.department);
    const levels = this.speciality.department.levels.clone();
    levels.removeIf(l => this.speciality.levelSpecialities.containsIf(ls => ls.level.id === l.id));

    this.levels = levels;
  }

  async add() {
    const levelSpeciality = await this._httpClient.addLevelSpeciality(this.level, this.speciality);
    await this._levelSpecialityLoader.load(levelSpeciality);

    this.speciality.addLevelSpeciality(levelSpeciality);
    this.level.addLevelSpeciality(levelSpeciality);

    this._alertEmitter.info(`Le niveau ${this.level.index + 1} a été ajouté à la spécialité ${this.speciality.name}!`);

    if (this._modal) {
      this._modal.close(levelSpeciality);
    }
  }
}
