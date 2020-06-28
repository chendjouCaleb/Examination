import {Component, Input, OnInit} from "@angular/core";
import {ScoreHttpClient, ScoreLoader, Test} from "examination/models";
import {TestService} from "../test.service";


@Component({
  templateUrl: 'score-list.component.html',
  selector: 'app-score-list'
})
export class ScoreListComponent implements OnInit {
  @Input()
  test: Test;

  constructor(private _httpClient: ScoreHttpClient,
              private _service: TestService,
              private _loader: ScoreLoader) {
  }

  async ngOnInit(): Promise<void> {
    this.test.scores = await this._loader.loadByTest(this.test);
  }

  add() {
    this._service.addScore(this.test);
  }
}
