import {Injectable} from '@angular/core';
import {Paper, ScorePaper} from '../entities';
import {PaperHttpClient, ScorePaperHttpClient} from "../httpClient";
import {ScoreLoader} from "./score.loader";
import {PaperLoader} from "./paper.loader";
import {Loader} from "./loader";


@Injectable({providedIn: 'root'})
export class ScorePaperLoader extends Loader<ScorePaper, number> {

  constructor(private _paperRepository: PaperHttpClient,
                private _scorePaperHttpClient: ScorePaperHttpClient,
              private _scoreLoader: ScoreLoader,
              private _paperLoader: PaperLoader) {
    super(_scorePaperHttpClient);
  }

  async load(item: ScorePaper): Promise<ScorePaper> {
    item.paper = await this._paperLoader.loadById(item.paperId);
    item.score = await this._scoreLoader.loadById(item.scoreId);
    return item;
  }

  async loadByPaper(paper: Paper) {
    const items = await this._scorePaperHttpClient.listByPaper(paper);

    for(const item of items) {
      await this.load(item);
    }

    paper.scorePapers = items;
    return items;
  }

  async loadById(id: number): Promise<ScorePaper> {
    return this.load(await this._httpClient.findAsync(id));
  }
}
