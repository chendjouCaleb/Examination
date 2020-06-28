import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {Paper, ScorePaper} from '../entities';
import {PaperHttpClient} from "../httpClient";
import {ScoreLoader} from "./score.loader";
import {PaperLoader} from "./paper.loader";


@Injectable({providedIn: 'root'})
export class ScorePaperLoader implements EntityLoader<ScorePaper, number> {

  constructor(private _paperRepository: PaperHttpClient,
              private _scoreLoader: ScoreLoader,
              private _paperLoader: PaperLoader) {
  }

  async load(item: ScorePaper): Promise<ScorePaper> {
    item.paper = await this._paperLoader.loadById(item.paperId);
    item.score = await this._scoreLoader.loadById(item.scoreId);
    return item;
  }

  async loadByPaper(paper: Paper) {
    const items = await this._paperRepository.getScores(paper);

    for(const item of items) {
      await this.load(item);
    }

    paper.scorePapers = items;
  }

  async loadById(id: number): Promise<ScorePaper> {
    throw new Error("Not implemented method!")
  }
}
