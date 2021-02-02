import {ChangeDetectorRef, Component, Inject, Input, OnInit} from '@angular/core';
import {ExaminationStudent, Paper, Test, TestGroup, TestLevelSpeciality} from 'examination/entities';
import {PaperLoader} from 'examination/loaders';
import {List} from '@positon/collections';
import {IPaperService, PAPER_SERVICE_TOKEN} from "../paper.service.interface";

@Component({
  templateUrl: 'paper-list.html',
  selector: 'app-paper-list'
})
export class PaperList implements OnInit {
  @Input()
  test: Test;

  @Input()
  testGroup: TestGroup;

  @Input()
  examinationStudent: ExaminationStudent;

  @Input()
  testLevelSpeciality: TestLevelSpeciality;

  constructor(private _paperLoader: PaperLoader, private _changeDetector: ChangeDetectorRef,
              @Inject(PAPER_SERVICE_TOKEN) public service: IPaperService) {
  }

  async ngOnInit() {
    if (this.test) {
      this._paperLoader.loadByTest(this.test);
    }

    if (this.examinationStudent) {
      this._paperLoader.loadByExaminationStudent(this.examinationStudent);
    }

    if (this.testGroup) {
      this._paperLoader.loadByTestGroup(this.testGroup);
    }

    if(this.testLevelSpeciality) {
      this._paperLoader.loadByTestLevelSpeciality(this.testLevelSpeciality);
    }
  }

  async addPapers() {
    await this.service.addPapers(this.test);
    this.reload();
  }

  async reload() {
    this.test.papers = null;
    Promise.resolve().then(async () => {
      await this._paperLoader.loadByTest(this.test);
      this._changeDetector.detectChanges();
    })
  }

  async group() {
    if (this.test) {
      const r = await this.service.group(this.test);
      if (r) {
        this.reload();
      }
    }
  }

  get papers(): List<Paper> {
    if (this.examinationStudent) {
      return this.examinationStudent.papers;
    }

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
}
