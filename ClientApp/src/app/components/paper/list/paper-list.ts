import {ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {ExaminationStudent, Paper, Test, TestGroup, TestLevelSpeciality} from 'examination/entities';
import {PaperLoader} from 'examination/loaders';
import {List} from '@positon/collections';
import {IPaperService, PAPER_SERVICE_TOKEN} from '../paper.service.interface';
import {MsTable} from '@ms-fluent/table';

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

  @ViewChild(MsTable)
  table: MsTable;

  papers: Paper[] = [];

  constructor(private _paperLoader: PaperLoader, private _changeDetector: ChangeDetectorRef,
              @Inject(PAPER_SERVICE_TOKEN) public service: IPaperService) {
  }

  async ngOnInit() {
    if (this.test) {
      await this._paperLoader.loadByTest(this.test);
    }

    if (this.examinationStudent) {
      await this._paperLoader.loadByExaminationStudent(this.examinationStudent);
    }

    if (this.testGroup) {
      await this._paperLoader.loadByTestGroup(this.testGroup);
    }

    if (this.testLevelSpeciality) {
      await this._paperLoader.loadByTestLevelSpeciality(this.testLevelSpeciality);
    }

    this.table.unshift(...this.getPapers().toArray());
    this.papers.unshift(...this.getPapers().toArray());
  }

  async addPapers() {
    await this.service.addPapers(this.test);
    this.reload();
  }

  async reload() {
    this.test.papers = null;
    Promise.resolve().then(async () => {
      await this._paperLoader.loadByTest(this.test);
      this.table.clear();
      this.table.unshift(...this.test.papers.toArray());
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

  getPapers(): List<Paper> {
    if (this.examinationStudent) {
      return this.examinationStudent.papers;
    }

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
}
