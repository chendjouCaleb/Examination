import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";
import {
  Examination,
  TestHttpClient,
  TestLoader,
  RoomHttpClient,
  Speciality,
  SpecialityHttpClient
} from "src/models";
import {TestAddForm} from "../form";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";
import {
  Corrector,
  CorrectorHttpClient, CorrectorLoader,
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

  correctors: List<Corrector>;

  constructor(private _httpClient: TestGroupCorrectorHttpClient,
              private _correctorHttpClient: CorrectorHttpClient,
              private _correctorLoader: CorrectorLoader,
              private _loader: TestGroupCorrectorLoader,
              private _dialogRef: MsfModalRef<TestGroupCorrectorAddComponent>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    this.correctors = await this._correctorLoader.loadByExamination(this.testGroup.test.examination);

    for(const item of this.testGroup.testGroupCorrectors) {
      this.correctors.removeIf(c => c.id === item.correctorId);
    }
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
