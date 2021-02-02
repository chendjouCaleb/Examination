import {Component, Input, OnInit} from "@angular/core";

import {AlertEmitter} from "src/controls/alert-emitter";
import {
  ApplicationHttpClient,
  ApplicationLoader,
  Department,
  DepartmentLoader,
  Level,
  LevelLoader,
  LevelSpeciality,
  LevelSpecialityLoader,
  School,
  SpecialityHttpClient, StudentHttpClient
} from "src/models";
import {ApplicationAddForm} from "../form";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";
import {AuthorizationManager} from "examination/app/authorization";


@Component({
  templateUrl: 'application-add.html'
})
export class ApplicationAdd implements OnInit {
  form: ApplicationAddForm;

  @Input()
  school: School;

  @Input()
  department: Department;

  @Input()
  level: Level;

  @Input()
  levelSpeciality: LevelSpeciality;

  departments = new List<Department>();

  constructor(private _httpClient: ApplicationHttpClient,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              private _levelLoader: LevelLoader,
              private _departmentLoader: DepartmentLoader,
              private _identity: AuthorizationManager,
              private _specialityHttpClient: SpecialityHttpClient,
              private _studentHttpClient: StudentHttpClient,
              private _loader: ApplicationLoader,
              private _dialogRef: MsfModalRef<ApplicationAdd>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    if (this.school) {
      await this.loadDepartments();
    } else if (this.department) {
      await this.loadLevels(this.department);
    } else if (this.level) {
      await this.loadLevelSpecialities(this.level);
    } else if (this.levelSpeciality) {
      this.level = this.levelSpeciality.level;
    } else {
      throw new Error("The are no location. You must provider school or department or level or speciality");
    }
    this.form = new ApplicationAddForm(this._identity.user, this.level, this.levelSpeciality);
  }

  async loadDepartments() {
    if (this.school) {
      this.departments = await this._departmentLoader.loadForSchool(this.school);
    } else {
      this.departments = new List<Department>();
    }
  }

  async loadLevelSpecialities(level: Level) {
    if (level) {
      this.level = level;
      await this._levelSpecialityLoader.loadByLevel(this.level);
    }
  }

  loadLevels(department: Department) {
    if (department) {
      this._levelLoader.loadByDepartment(department);
      this.department = department;
    }
  }

  registrationIdIsUsed: boolean = false;
  async checkRegistrationId() {
    const registrationId = this.form.getControl("registrationId");
    if (registrationId.value.length > 2) {
      const student = await this._studentHttpClient.findByRegistrationId(this.getSchool(), registrationId.value);

      this.registrationIdIsUsed = !!(student && student.id);
    }
  }


  async add() {
    const model = this.form.getModel();

    let application = await this._httpClient.addApplication(model.body, model.params);
    await this._loader.load(application);
    model.level.addApplication(application);
    model.level.department.addApplication(application);
    this._alertEmitter.info(`La demande a été envoyée.`);


    if (this._dialogRef) {
      this._dialogRef.close(application);
    }
  }

  getSchool(): School {
    if(this.school) {
      return this.school;
    }else if(this.department) {
      return this.department.school;
    }else if(this.level) {
      return this.level.department.school;
    }
    return this.levelSpeciality.level.department.school;
  }
}

