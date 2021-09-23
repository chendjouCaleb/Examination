import {Component, OnInit} from '@angular/core';
import {StudentAdd} from '../student-add';
import {DepartmentLoader, LevelLoader, LevelSpecialityLoader, SpecialityLoader} from 'examination/loaders';
import {IStudentAddOptions, StudentAddOptions} from '../student-add-options';

@Component({
  templateUrl: 'student-add-level.html',
  selector: 'student-add-level'
})
export class StudentAddLevel implements OnInit {

  constructor(public parent: StudentAdd,
              private departmentLoader: DepartmentLoader,
              private levelLoader: LevelLoader,
              private specialityLoader: SpecialityLoader,
              private levelSpecialityLoader: LevelSpecialityLoader) {
  }

  ngOnInit(): void {
    if (this.canSelectDepartment) {
      this.departmentLoader.loadBySchool(this.options.school);
    }

    this.loadLevels();
    this.loadLevelSpecialities();
    this.loadSpecialityLevel();
  }


  next() {
    if (!this.data.level) {
      return;
    }

    this.parent.model.level = this.data.level;
    this.parent.model.levelSpeciality = this.data.levelSpeciality;
    this.parent.stepper.next();
  }

  loadLevels(): void {
    if (this.canSelectLevel) {
      this.levelLoader.loadByDepartment(this.options.data.department);
    }
  }

  loadLevelSpecialities(): void {
    if (this.canSelectLevelSpeciality) {
      this.levelSpecialityLoader.loadByLevel(this.options.data.level);
    }
  }

  loadSpecialityLevel(): void {
    if (this.canSelectSpecialityLevel) {
      this.levelSpecialityLoader.loadBySpeciality(this.options.data.speciality);
    }
  }

  get canSelectDepartment(): boolean {
    return this.options.school && !this.options.department
  }

  get canSelectLevel(): boolean {
    return this.options.data.department && !this.options.level && !this.options.speciality;
  }


  /**
   * Can select level speciality by the provided level.
   */
  get canSelectLevelSpeciality(): boolean {
    return this.options.data.level && !this.options.levelSpeciality;
  }

  /**
   * Can select level speciality by the provided speciality.
   */
  get canSelectSpecialityLevel(): boolean {
    return this.options.data.speciality && !this.options.levelSpeciality;
  }


  get options(): StudentAddOptions {
    return this.parent.options;
  }

  get data(): IStudentAddOptions {
    return this.options.data;
  }
}
