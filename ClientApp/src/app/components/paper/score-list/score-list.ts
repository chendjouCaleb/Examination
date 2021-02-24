import {ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {ExaminationStudent, Paper, Test, TestGroup, TestLevelSpeciality, TestScore} from 'examination/entities';
import {PaperLoader, TestScoreLoader} from 'examination/loaders';
import {IPaperService, PAPER_SERVICE_TOKEN} from '../paper.service.interface';
import {List} from '@positon/collections';
import {MsTable} from '@ms-fluent/table';

@Component({
  templateUrl: 'score-list.html',
  selector: 'app-paper-score-list'
})
export class PaperScoreList implements OnInit {
  @Input()
  test: Test;

  @Input()
  testGroup: TestGroup;

  @Input()
  examinationStudent: ExaminationStudent;

  @Input()
  testLevelSpeciality: TestLevelSpeciality;

  @ViewChild(MsTable)
  table: MsTable;

  papers: Paper[] = [];


  constructor(private _paperLoader: PaperLoader, private _changeDetector: ChangeDetectorRef,
              private _testScoreLoader: TestScoreLoader,
              @Inject(PAPER_SERVICE_TOKEN) public service: IPaperService) {
  }

  async ngOnInit() {
    if (this.test) {
      await this._paperLoader.loadByTest(this.test);
      await this._testScoreLoader.loadByTest(this.test);
    }

    if (this.testGroup) {
      await this._paperLoader.loadByTestGroup(this.testGroup);
      await this._testScoreLoader.loadByTest(this.testGroup.test);
    }

    if (this.testLevelSpeciality) {
      await this._paperLoader.loadByTestLevelSpeciality(this.testLevelSpeciality);
      await this._testScoreLoader.loadByTest(this.testLevelSpeciality.test);
    }



    this.papers.unshift(...this.getPapers().toArray());

    this.papers.forEach(p => p.assignScore());

    this.table.unshift(...this.papers);
  }

  getPapers(): List<Paper> {
    if (this.test) {
      return this.test.papers;
    }

    if (this.testGroup) {
      return this.testGroup.papers;
    }

    if (this.testLevelSpeciality) {
      return this.testLevelSpeciality.papers;
    }

    return new List<Paper>();
  }

  get _test() {
    if (this.test) {
      return this.test;
    }
    if (this.testLevelSpeciality) {
      return this.testLevelSpeciality.test;
    }
    return this.testGroup.test;
  }

  get testScores(): List<TestScore> {
    return this._test.testScores;
  }
}
