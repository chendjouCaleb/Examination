import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {ScorePaper} from '../entities';
import {RoomLoader} from './room.loader';
import {TestLoader} from './test.loader';
import {GroupLoader} from './group.loader';
import {ScorePaperHttpClient} from "../httpClient/score-paper.httpClient";
import {PaperLoader, ScoreLoader} from "examination/models";


@Injectable({providedIn: 'root'})
export class ScorePaperLoader implements EntityLoader<ScorePaper, number> {

  constructor(private scorePaperRepository: ScorePaperHttpClient,
              private _scoreLoader: ScoreLoader,
              private _paperLoader: PaperLoader) {
  }

  async load(item: ScorePaper): Promise<ScorePaper> {
    item.paper = await this._paperLoader.loadById(item.paperId);
    item.score = await this._scoreLoader.loadById(item.scoreId);
    return item;
  }

  async loadById(id: number): Promise<ScorePaper> {
    const item = await this.scorePaperRepository.findAsync(id);
    await this.load(item);
    return item;
  }
}
