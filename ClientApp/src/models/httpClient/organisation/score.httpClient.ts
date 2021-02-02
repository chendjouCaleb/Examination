import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Course, Score} from 'examination/entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {ScoreAddModel} from 'examination/models';


@Injectable()
export class ScoreHttpClient extends GenericHttpClient<Score, number> {
  url: string = SERVER_URL + '/scores';

  createFromAny(value: any): Score {
    return new Score(value);
  }

  listByCourse(course: Course): Promise<List<Score>> {
    return this.listAsync({courseId: course.id});
  }

  async findByName(course: Course, name: string): Promise<Score> {
    const result = this.httpClient.get(`${this.url}/find/name?courseId=${course.id}&name=${name}`).toPromise();
    if (result) {
      return new Score(result);
    }
    return null;
  }

  changeName(score: Score): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${score.id}/name`, {}, {params: {name}}).toPromise();
  }

  addScore(model: ScoreAddModel, course: Course): Promise<Score> {
    return this.add(model, {courseId: course.id});
  }

}
