import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {
  Department,
  Level,
  LevelSpeciality,
  Speciality,
  SemesterLevelSpeciality, SemesterCourse
} from 'examination/entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {SemesterCourseLevelSpeciality} from "../../entities/course";


@Injectable()
export class SemesterCourseLevelSpecialityHttpClient extends GenericHttpClient<SemesterCourseLevelSpeciality, number> {
  url: string = SERVER_URL + '/semesterCourseLevelSpecialities';

  createFromAny(value: any): SemesterCourseLevelSpeciality {
    return new SemesterCourseLevelSpeciality(value);
  }

  async findByCode(department: Department, code: string): Promise<SemesterCourseLevelSpeciality> {
    const result = await this.httpClient.get(`${this.url}/find/code?departmentId=${department.id}&code=${code}`).toPromise();
    if (result) {
      return new SemesterCourseLevelSpeciality(result);
    }
    return null;
  }

  listByLevel(level: Level): Promise<List<SemesterCourseLevelSpeciality>> {
    return this.listAsync({levelId: level.id});
  }


  listByLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<List<SemesterCourseLevelSpeciality>> {
    return this.listAsync({levelSpecialityId: levelSpeciality.id});
  }

  listBySpeciality(speciality: Speciality): Promise<List<SemesterCourseLevelSpeciality>> {
    return this.listAsync({specialityId: speciality.id});
  }

  addSemesterCourseLevelSpeciality(semesterCourse: SemesterCourse,
                                   semesterLevelSpeciality: SemesterLevelSpeciality): Promise<SemesterCourseLevelSpeciality> {
    const params = {
      semesterCourseId: semesterCourse.id,
      semesterLevelSpecialityId: semesterLevelSpeciality.id
    };

    return this.add({}, params);
  }

}
