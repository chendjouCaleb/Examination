import {ChangeDetectorRef, Component, Inject, Input, OnInit} from "@angular/core";
import {ExaminationStudent, Paper, Test, TestGroup, TestLevelSpeciality, TestScore} from "examination/entities";
import {PaperLoader, TestScoreLoader} from "examination/loaders";
import {IPaperService, PAPER_SERVICE_TOKEN} from "../paper.service.interface";
import {List} from "@positon/collections";

@Component({
  templateUrl: 'score-list.html',
  selector: 'app-paper-score-list'
})
export class PaperScoreList implements OnInit{
  @Input()
  test: Test;

  @Input()
  testGroup: TestGroup;

  @Input()
  examinationStudent: ExaminationStudent;

  @Input()
  testLevelSpeciality: TestLevelSpeciality;


  constructor(private _paperLoader: PaperLoader, private _changeDetector: ChangeDetectorRef,
              private _testScoreLoader: TestScoreLoader,
              @Inject(PAPER_SERVICE_TOKEN) public service: IPaperService) {
  }

  ngOnInit(): void {
    if (this.test) {
      this._paperLoader.loadByTest(this.test);
      this._testScoreLoader.loadByTest(this.test);
    }

    if (this.testGroup) {
      this._paperLoader.loadByTestGroup(this.testGroup);
      this._testScoreLoader.loadByTest(this.testGroup.test);
    }

    if(this.testLevelSpeciality) {
      this._paperLoader.loadByTestLevelSpeciality(this.testLevelSpeciality);
      this._testScoreLoader.loadByTest(this.testLevelSpeciality.test);
    }

  }

  get papers(): List<Paper> {
    if (this.test) {
      return this.test.papers;
    }

    if (this.testGroup) {
      return this.testGroup.papers;
    }

    if(this.testLevelSpeciality) {
      return this.testLevelSpeciality.papers;
    }

    return new List<Paper>();
  }

  get _test() {
    if(this.test) {
      return this.test;
    }
    if(this.testLevelSpeciality) {
      return this.testLevelSpeciality.test;
    }
    return this.testGroup.test;
  }

  get testScores(): List<TestScore> {
    return this._test.testScores;
  }
}
