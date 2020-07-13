import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";
import {
  Corrector,
  CorrectorHttpClient,
  CorrectorLoader,
  TestGroup,
  TestGroupCorrectorHttpClient,
  TestGroupCorrectorLoader
} from "examination/models";

@Component({
  templateUrl: 'test-group-corrector-add.component.html'
})
export class TestGroupCorrectorAddComponent implements OnInit{
  correctorId: number[] = [];

  @Input()
  testGroup: TestGroup;

  correctors: Array<Corrector>;

  constructor(private _httpClient: TestGroupCorrectorHttpClient,
              private _correctorHttpClient: CorrectorHttpClient,
              private _correctorLoader: CorrectorLoader,
              private _loader: TestGroupCorrectorLoader,
              private _dialogRef: MsfModalRef<TestGroupCorrectorAddComponent>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    const correctors = await this._correctorLoader.loadByExamination(this.testGroup.test.examination);



    this.correctors = correctors.toArray();//.filter(c => !this.testGroup.testGroupCorrectors.containsIf(cc => cc.id === c.id));

    // for(const item of this.testGroup.testGroupCorrectors) {
    //   this.correctors.removeIf(c => !c || c.id === item.correctorId);
    // }
  }


  async add() {
    const correctors = await this._httpClient.addRange({},
      {correctorId: this.correctorId,
      testGroupId: this.testGroup.id});

    for (const corrector of correctors) {
      await this._loader.load(corrector);
    }

    this.testGroup.testGroupCorrectors.addRange(correctors);

    this._alertEmitter.info(`Les correcteurs ont été ajoutées.`);
    this._dialogRef.close(correctors);
  }
}
