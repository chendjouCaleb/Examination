import {Injectable} from '@angular/core';

import {PaperLoader} from "./paper.loader";
import {Loader} from "../loader";
import {Paper, ScorePaper} from "examination/entities";
import {PaperHttpClient, ScorePaperHttpClient} from "examination/models/http";
import {TestScoreLoader} from "./test-score.loader";


@Injectable({providedIn: 'root'})
export class ScorePaperLoader extends Loader<ScorePaper, number> {

  constructor(private _paperRepository: PaperHttpClient,
                private _scorePaperHttpClient: ScorePaperHttpClient,
              private _testScoreLoader: TestScoreLoader,
              private _paperLoader: PaperLoader) {
    super(_scorePaperHttpClient);
  }

  async load(item: ScorePaper): Promise<ScorePaper> {
    item.paper = await this._paperLoader.loadById(item.paperId);
    item.testScore = await this._testScoreLoader.loadById(item.testScoreId);
    return item;
  }

  async loadByPaper(paper: Paper) {
    const items = await this._scorePaperHttpClient.listByPaper(paper);

    for(const item of items) {
      await this.load(item);
    }

    paper.scorePapers = items.toArray();
    return items;
  }

  async loadById(id: number): Promise<ScorePaper> {
    return this.load(await this._httpClient.findAsync(id));
  }
}
