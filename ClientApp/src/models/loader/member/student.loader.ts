import {Injectable} from '@angular/core';
import {LevelLoader, LevelSpecialityLoader} from '../organisation';
import {Loader} from '../loader';

import {StudentHttpClient, UserHttpClient} from 'examination/models/http';
import {Department, Level, LevelSpeciality, School, Speciality, Student} from 'examination/entities';


@Injectable({providedIn: 'root'})
export class StudentLoader extends Loader<Student, number> {

  constructor(private studentRepository: StudentHttpClient,
              private _userHttClient: UserHttpClient,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              private _levelLoader: LevelLoader) {
    super(studentRepository);
  }

  async load(item: Student): Promise<Student> {
    if (item.registerUserId) {
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }

    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    if (item.levelSpecialityId) {
      item.levelSpeciality = await this._levelSpecialityLoader.loadById(item.levelSpecialityId);
    }

    if (item.hasImage) {
      item.imageUrl = this.studentRepository.getStudentImageUrl(item);
    } else {
      item.imageUrl = '/assets/icon/graduated.svg';
    }


    item.level = await this._levelLoader.loadById(item.levelId);
    return item;
  }

  async loadBySchool(school: School): Promise<void> {
    if (school && !school.students) {
      const students = await this.studentRepository.list({schoolId: school.id});
      for (const student of students) {
        await this.load(student);
      }
      school.students = students;
    }
  }


  async loadByDepartment(department: Department): Promise<void> {
    if (department && !department.students) {
      const students = await this.studentRepository.list({departmentId: department.id});
      for (const student of students) {
        await this.load(student);
      }
      department.students = students;
    }
  }

  async loadByLevel(level: Level): Promise<void> {
    if (level && !level.students) {
      const students = await this.studentRepository.list({levelId: level.id});
      for (const student of students) {
        await this.load(student);
        student.level = level;
      }
      level.students = students;
    }
  }

  async loadByLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<void> {
    if (levelSpeciality && !levelSpeciality.students) {
      const students = await this.studentRepository.list({levelSpecialityId: levelSpeciality.id});
      for (const student of students) {
        await this.load(student);
      }
      levelSpeciality.students = students;
    }
  }


  async loadBySpeciality(speciality: Speciality): Promise<void> {
    if (speciality && !speciality.students) {
      const students = await this.studentRepository.list({specialityId: speciality.id});
      for (const student of students) {
        await this.load(student);
      }
      speciality.students = students;
    }
  }
}
