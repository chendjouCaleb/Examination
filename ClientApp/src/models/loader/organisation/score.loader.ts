import {Injectable} from '@angular/core';

import {CourseLoader} from '../course/course.loader';
import {List} from "@positon/collections";
import {Loader} from "../loader";
import {Course, Score} from "examination/entities";
import {ScoreHttpClient} from "examination/models/http";


@Injectable({providedIn: 'root'})
export class ScoreLoader extends Loader<Score, number> {

  constructor(private scoreRepository: ScoreHttpClient, private _courseLoader: CourseLoader) {
    super(scoreRepository);
  }

  async load(item: Score): Promise<Score> {
    item.course = await this._courseLoader.loadById(item.courseId);
    return item;
  }

  async loadById(id: number): Promise<Score> {
    const item = await this.scoreRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByCourse(course: Course): Promise<void> {
    if (!course.scores) {
      const scores = await this.scoreRepository.listAsync({courseId: course.id});
      for (const score of scores) {
        await this.load(score);
      }
      course.scores = scores;
    }
  }
}
