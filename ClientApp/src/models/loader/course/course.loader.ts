import {Injectable} from '@angular/core';
import {LevelLoader} from '../organisation/level.loader';
import {Loader} from "../loader";
import {Course, Level, Speciality} from "examination/entities";
import {CourseHttpClient, UserHttpClient} from "examination/models/http";


@Injectable({providedIn: 'root'})
export class CourseLoader extends Loader<Course, number> {

  constructor(private courseRepository: CourseHttpClient,
              private _userHttClient: UserHttpClient,
              private _levelLoader: LevelLoader) {
    super(courseRepository);
  }

  async load(item: Course): Promise<Course> {
    item.level = await this._levelLoader.loadById(item.levelId);
    return item;
  }

  async loadById(id: number): Promise<Course> {
    const item = await this.courseRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByLevel(level: Level): Promise<void> {
    if (!level.courses) {
      const courses = await this.courseRepository.listAsync({levelId: level.id});
      for (const course of courses) {
        await this.load(course);
      }
      level.courses = courses;
    }
  }

  async loadBySpeciality(speciality: Speciality): Promise<void> {
    if (!speciality.courses) {
      const courses = await this.courseRepository.listAsync({specialityId: speciality.id});
      for (const course of courses) {
        await this.load(course);
      }
      speciality.courses = courses;
    }
  }
}
