import {Component, Input, OnInit} from '@angular/core';
import {Examination, ExaminationDepartment, ExaminationLevel, School, Test, TestGroup} from 'examination/entities';
import {BreadcrumbItem} from 'examination/infrastructure';
import {Title} from '@angular/platform-browser';
import {CurrentItems} from 'examination/app/current-items';
import {TestGroupCorrectorLoader, TestGroupSecretaryLoader, TestGroupSupervisorLoader} from "examination/loaders";
import {AuthorizationManager} from "examination/app/authorization";

@Component({
  templateUrl: 'test-group.page-layout.html',
  selector: 'app-test-group-page-layout'
})
export class TestGroupPageLayout implements OnInit {
  @Input()
  testGroup: TestGroup;

  @Input()
  paths: BreadcrumbItem[] = [];

  @Input()
  title: string;

  breadCrumbItems: BreadcrumbItem[] = [];

  _isOk: boolean;

  constructor(private _title: Title, private _items: CurrentItems,
              private _authorizer: AuthorizationManager,
              private _testGroupCorrectorLoader: TestGroupCorrectorLoader,
              private _testGroupSupervisorLoader: TestGroupSupervisorLoader,
              private _testGroupSecretaryLoader: TestGroupSecretaryLoader) {
    this.testGroup = _items.get('testGroup');
  }

  async ngOnInit() {
    this.breadCrumbItems = [
      {name: 'établissements', url: '/schools'},
      {name: this.examination.school.name, url: `${this.examination.school.url}`},

      {name: 'Examens', url: `${this.examination.school.url}/examinations`},
      {name: this.examination.name, url: `${this.examination.url}`},

      {name: 'Départements', url: `${this.examination.url}/departments`},
      {name: this.examinationDepartment.department.name, url: `${this.examinationDepartment.url}`},

      {name: 'Niveaux' },
      {name: `Niveau ${this.examinationLevel.level.index + 1}`, url: `${this.examinationLevel.url}`},

      {name: 'épreuves', url: `${this.examinationLevel.url}#tests`},
      {name: `${this.test.course.name}(${this.test.course.code})`, url: `${this.test.url}`},

      {name: 'Groupes'},
      {name: `${this.testGroup.index}`, url: `${this.testGroup.url}`}
    ];

    this.breadCrumbItems.push(...this.paths);

    if (this.title) {
      this.breadCrumbItems.push({name: this.title});
      this._title.setTitle(this.title);
    } else {
      this._title.setTitle(`Épreuves - ${this.test.course.name}(${this.test.course.code})`);
    }

    await this._testGroupCorrectorLoader.loadByTestGroup(this.testGroup);
    await this._testGroupSupervisorLoader.loadByTestGroup(this.testGroup);
    await this._testGroupSecretaryLoader.loadByTestGroup(this.testGroup);
    this._isOk = true;
    this.relation();
  }


  relation() {
    const userId = this._authorizer.user?.id;
    this.testGroup.relation = {
      isPlanner: this._items.find<School>('school').userPrincipal.isPlanner,
      isCorrector: this.testGroup.testGroupCorrectors?.containsIf(t => t.corrector.userId === userId),
      isSupervisor: this.testGroup.testGroupSupervisors?.containsIf(t => t.supervisor.userId === userId),
      isSecretary: this.testGroup.testGroupSecretaries?.containsIf(t => t.secretary.userId === userId),
      isStudent: this.testGroup.papers?.containsIf(t => t.examinationStudent.student?.userId === userId),
    };

  }

  get examination(): Examination {
    return this.examinationDepartment.examination;
  }

  get examinationDepartment(): ExaminationDepartment {
    return this.examinationLevel.examinationDepartment;
  }

  get examinationLevel(): ExaminationLevel {
    return this.test.examinationLevel;
  }

  get test(): Test {
    return this.testGroup.test;
  }
}
