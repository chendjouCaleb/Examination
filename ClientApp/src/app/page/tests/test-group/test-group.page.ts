import {Component, Inject, OnDestroy} from '@angular/core';
import {Paper, PaperHttpClient, PaperLoader, TestGroup} from 'src/models';
import {CurrentItems} from '../../../current-items';
import {ITestGroupService, ITestService, TEST_GROUP_SERVICE_TOKEN, TEST_SERVICE_TOKEN} from "examination/app/test";
import {AlertEmitter} from "examination/controls";
import {TestGroupHub} from "examination/hubs";
import {List} from "@positon/collections";
import {PaperService} from "examination/app/paper";

@Component({
  templateUrl: 'test-group.page.html',
  selector: 'app-test-group'
})
export class TestGroupPage implements OnDestroy {
  testGroup: TestGroup;

  papers: List<Paper>;

  testGroupEndedSubscription = this._testGroupHub.testGroupEnded.subscribe((testGroup: TestGroup) => {
    if (testGroup.id === this.testGroup.id) {
      this.testGroup.endDate = testGroup.endDate;
      this._alertEmitter.info("Cette groupe vient d'être arrêtée.");
    }
  });

  testGroupRestartedSubscription = this._testGroupHub.testGroupRestarted.subscribe((testGroup: TestGroup) => {
    if (testGroup.id === this.testGroup.id) {
      this.testGroup.endDate = null;
      this._alertEmitter.info("Ce groupe vient d'être relancée.");
    }
  });

  testGroupStartedSubscription = this._testGroupHub.testGroupStarted.subscribe((testGroup: TestGroup) => {
    if (testGroup.id === this.testGroup.id) {
      this.testGroup.startDate = testGroup.startDate;
      this._alertEmitter.info("Ce groupe vient d'être relancée.");
    }
  });

  constructor(currentItems: CurrentItems,
              private _alertEmitter: AlertEmitter,
              private _testGroupHub: TestGroupHub,
              private _paperHttpClient: PaperHttpClient,
              private _paperLoader: PaperLoader,
              public paperService: PaperService,
              @Inject(TEST_GROUP_SERVICE_TOKEN) public service: ITestGroupService,
              @Inject(TEST_SERVICE_TOKEN) public testService: ITestService) {
    this.testGroup = currentItems.get('testGroup');
  }


  async ngOnInit() {
    const papers = await this._paperHttpClient.listByTestGroup(this.testGroup);
    await this._paperLoader.loadAll(papers);
    this.papers = papers;
  }

  async addPapers() {
    const papers = await this._paperHttpClient.addPapers(this.testGroup);
    await this._paperLoader.loadAll(papers);
    this.papers = papers;
  }

  ngOnDestroy(): void {
    this.testGroupEndedSubscription.unsubscribe();
    this.testGroupRestartedSubscription.unsubscribe();
    this.testGroupStartedSubscription.unsubscribe();
  }
}
