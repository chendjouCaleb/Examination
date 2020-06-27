import {Component, Input, OnInit} from "@angular/core";
import {Examination, Test, TestHttpClient, TestLoader} from "examination/models";
import {List} from "@positon/collections";
import {TestService} from "../test.service";

@Component({
  templateUrl: 'test-list.component.html',
  selector: 'app-test-list'
})
export class TestListComponent implements OnInit {
  tests: List<Test>;

  @Input()
  examination: Examination;

  constructor(private _httpClient: TestHttpClient,
              private _service: TestService,
              private _loader: TestLoader) {
  }

  async ngOnInit(): Promise<void> {
    const tests = await this._httpClient.listByExamination(this.examination);
    for (const test of tests) {
      await this._loader.load(test);
    }

    this.tests = tests;

    this._service.onremove.subscribe(test => this.tests.remove(test));
  }

  add() {
    this._service.add(this.examination).subscribe(async test => {
      if(test) {
        await this._loader.load(test);
        this.tests.insert(0, test);
      }

    })
  }
}
