import {Injectable} from '@angular/core';

import {Loader} from '../loader';
import {Course, CourseLevelSpeciality, LevelSpeciality} from 'examination/entities';
import {CourseLevelSpecialityHttpClient, UserHttpClient} from 'examination/models/http';
import { LevelSpecialityLoader} from '../organisation';
import {CourseLoader } from './course.loader';


@Injectable({providedIn: 'root'})
export class CourseLevelSpecialityLoader extends Loader<CourseLevelSpeciality, number> {

  constructor(private courseLevelSpecialityRepository: CourseLevelSpecialityHttpClient,
              private _userHttClient: UserHttpClient,
              private _courseLoader: CourseLoader,
              private _levelSpecialityLoader: LevelSpecialityLoader) {
    super(courseLevelSpecialityRepository);
  }

  async load(item: CourseLevelSpeciality): Promise<CourseLevelSpeciality> {
    item.levelSpeciality = await this._levelSpecialityLoader.loadById(item.levelSpecialityId);
    item.course = await this._courseLoader.loadById(item.courseId);
    return item;
  }

  async loadById(id: number): Promise<CourseLevelSpeciality> {
    const item = await this.courseLevelSpecialityRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByCourse(course: Course): Promise<void> {
    if (course.courseLevelSpecialities) {
      return;
    }
    const items = await this.courseLevelSpecialityRepository.listAsync({courseId: course.id});
    for (const courseLevelSpeciality of items) {
      await this.load(courseLevelSpeciality);
    }
    course.courseLevelSpecialities = items;
  }

  async loadByLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<void> {
    if (levelSpeciality.courseLevelSpecialities) {
      return;
    }

    const items = await this.courseLevelSpecialityRepository.listAsync(
      {levelSpecialityId: levelSpeciality.id}
    );

    for (const courseLevelSpeciality of items) {
      await this.load(courseLevelSpeciality);
    }

    levelSpeciality.courseLevelSpecialities = items;
  }
}
