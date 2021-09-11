import {Department, Level, LevelSpeciality, School, Speciality} from 'examination/entities';

export interface IStudentAddOptions {
  school?: School;
  department?: Department;
  level?: Level;
  speciality?: Speciality;
  levelSpeciality?: LevelSpeciality
}

export class StudentAddOptions {
  private _school: School;
  private _department: Department;
  private _level: Level;
  private _speciality: Speciality;
  private _levelSpeciality: LevelSpeciality;

  constructor(public data: IStudentAddOptions) {
    if (data.school) {
      this.school = data.school;
    } else if (data.department) {
      this.department = data.department;
    } else if (data.level) {
      this.level = data.level;
    } else if (data.speciality) {
      this.speciality = data.speciality;
    } else if (data.levelSpeciality) {
      this.levelSpeciality = data.levelSpeciality;
    }
  }


  get school(): School {
    return this._school;
  }

  set school(value: School) {
    this._school = value;
  }

  get department(): Department {
    return this._department;
  }

  set department(value: Department) {
    this._department = value;
    this.school = value.school;
  }

  get level(): Level {
    return this._level;
  }

  set level(value: Level) {
    this._level = value;
    this.department = value.department;
  }

  get speciality(): Speciality {
    return this._speciality;
  }

  set speciality(value: Speciality) {
    this._speciality = value;
    this.department = value.department;
  }


  get levelSpeciality(): LevelSpeciality {
    return this._levelSpeciality;
  }

  set levelSpeciality(value: LevelSpeciality) {
    this._levelSpeciality = value;
    this._level = value.level;
    this._speciality = value.speciality;
  }
}
