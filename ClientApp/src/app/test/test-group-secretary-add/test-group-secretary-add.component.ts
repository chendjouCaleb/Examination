import {Component, Input, OnInit} from "@angular/core";
import {AlertEmitter} from "src/controls/alert-emitter";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";
import {
  Secretary,
  SecretaryHttpClient,
  SecretaryLoader,
  TestGroup,
  TestGroupSecretaryHttpClient,
  TestGroupSecretaryLoader
} from "examination/models";

@Component({
  templateUrl: 'test-group-secretary-add.component.html'
})
export class TestGroupSecretaryAddComponent implements OnInit{
  secretaryId: number[] = [];

  @Input()
  testGroup: TestGroup;

  secretaries: List<Secretary>;

  constructor(private _httpClient: TestGroupSecretaryHttpClient,
              private _secretaryHttpClient: SecretaryHttpClient,
              private _secretaryLoader: SecretaryLoader,
              private _loader: TestGroupSecretaryLoader,
              private _dialogRef: MsfModalRef<TestGroupSecretaryAddComponent>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    this.secretaries = await this._secretaryLoader.loadByExamination(this.testGroup.test.examination);

    for(const item of this.testGroup.testGroupSecretaries) {
      this.secretaries.removeIf(c => c.id === item.secretaryId);
    }
  }


  async add() {
    const secretaries = await this._httpClient.addRange({},
      {secretaryId: this.secretaryId,
      testGroupId: this.testGroup.id});

    for (const secretary of secretaries) {
      await this._loader.load(secretary);
    }

    this.testGroup.testGroupSecretaries.addRange(secretaries);

    this._alertEmitter.info(`Les sécretaires ont été ajoutés.`);
    this._dialogRef.close(secretaries);
  }
}
