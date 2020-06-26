import {Component, Input, OnInit} from "@angular/core";
import {LocalTime} from "@js-joda/core";
import {AlertEmitter} from "src/controls/alert-emitter";
import {
  Examination,
  TestHttpClient,
  TestLoader,
  Room,
  RoomHttpClient,
  Speciality,
  SpecialityHttpClient
} from "src/models";
import {TestAddForm} from "../form";
import {MsfModalRef} from "fabric-docs";
import {List} from "@positon/collections";


@Component({
  templateUrl: 'test-add.component.html'
})
export class TestAddComponent implements OnInit{
  form:TestAddForm;

  @Input()
  examination: Examination;

  @Input()
  speciality: Speciality;

  specialities: List<Speciality>;

  constructor(private _httpClient: TestHttpClient,
              private _roomHttpClient: RoomHttpClient,
              private _specialityHttpClient: SpecialityHttpClient,
              private _loader: TestLoader,
              private _dialogRef: MsfModalRef<TestAddComponent>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    if(!this.speciality){
      this.specialities = await this._specialityHttpClient.listByExamination(this.examination);
    }

    this.form = new TestAddForm({speciality: this.speciality, radical: 20, coefficient: 1,})

  }

  async checkCode() {
    const code = this.form.getControl("code");
    if (code.value && code.value.match(/^[a-zA-Z0-9 ]+$/)) {
      const test = await this._httpClient.findByCode(this.examination, code.value);
      if (test && test.id) {
        code.addError("Ce code est déjà utilisé par une autre épreuve");
      }
    }
  }


  async add() {
    const formModel = this.form.getModel();
    let params: any = {
      ...formModel.params,
      examinationId: this.examination.id
    };
    let test = await this._httpClient.add(formModel.body, params);
    await this._loader.load(test);
    this._alertEmitter.info(`L'épreuve ${test.name} a été ajouté.`);
    this._dialogRef.close(test);
  }
}
