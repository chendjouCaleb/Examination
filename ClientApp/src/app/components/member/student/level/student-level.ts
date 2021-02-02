import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";
import {Level, LevelHttpClient, LevelSpeciality, LevelSpecialityLoader, Student, StudentHttpClient} from "src/models";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";


@Component({
  templateUrl: 'student-level.html'
})
export class StudentLevel implements OnInit {
  @Input()
  student: Student;


  levelSpeciality: LevelSpeciality;
  level: Level;

  levels = new List<Level>();

  constructor(private _httpClient: StudentHttpClient,
              private _levelHttpClient: LevelHttpClient,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              private _modalRef: MsfModalRef<StudentLevel>,
              private _alertEmitter: AlertEmitter) {
  }

  async ngOnInit() {
    this.level = this.student.level;
    this.levels = await this._levelHttpClient.listByDepartment(this.level.department);
    await this.loadLevelSpecialities();
  }

  async loadLevelSpecialities() {
     await this._levelSpecialityLoader.loadByLevel(this.level);
  }


  async change() {
    await this._httpClient.changeLevel(this.student, this.level, this.levelSpeciality);
    this.student.level.students.remove(this.student);
    this.student.levelSpeciality?.students.remove(this.student);

    this.student.level = this.level;
    this.student.levelSpeciality = this.levelSpeciality;

    this._alertEmitter.info(`L'étudiant ${this.student.fullName} a changé de niveau et de spécialité.`);
    if (this._modalRef) {
      this._modalRef.close(true);
    }
  }

  cancel() {
    if (this._modalRef) {
      this._modalRef.close(false);
    }
  }
}

