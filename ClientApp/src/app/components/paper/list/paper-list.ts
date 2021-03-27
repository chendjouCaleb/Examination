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
  table: MsTable<Paper>;

  papers: Paper[] = [];

  isLoading: boolean = true;

  constructor(private _paperLoader: PaperLoader,
              private _changeDetector: ChangeDetectorRef,
              @Inject(PAPER_SERVICE_TOKEN) public service: IPaperService) {
  }

  async ngOnInit() {
    try {
      await this.load();
      this.isLoading = false;
    }catch (e) {
      this.isLoading = false;
    }
  }



  async load() {
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

    this.table.clear();
    this.papers = [];
    this.table.unshift(...this.getPapers().toArray());
    this.papers.unshift(...this.getPapers().toArray());
  }

  async addPapers() {
    await this.service.addPapers(this.test);
    this.reload();
  }

  async reload() {
    if (this.test) {
      this.test.papers = null;
    }

    if (this.examinationStudent) {
      this.examinationStudent.papers = null;
    }

    if (this.testGroup) {
      this.testGroup.papers = null;
    }

    if (this.testLevelSpeciality) {
      this.testLevelSpeciality.papers = null;
    }

    this.load();
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
