import {Injectable} from "@angular/core";
import {EntityLoader} from "./entity-loader.interface";
import {
  Examination,
  Student,
  Test,
  TestGroup,
  TestGroupCorrector,
  TestGroupSecretary,
  TestGroupSupervisor,
  User
} from "../entities";
import {UserHttpClient} from "../httpClient";
import {ExaminationLoader} from "./examination.loader";
import {List} from "@positon/collections";
import {SpecialityLoader} from "./speciality.loader";
import {RoomLoader} from "./room.loader";
import {GroupLoader} from "./group.loader";
import {TestLoader} from "./test.loader";
import {TestGroupLoader} from "./test-group.loader";
import {StudentLoader} from "./student.loader";
import {TestGroupSupervisorLoader} from "./test-group-supervisor.loader";
import {TestGroupCorrectorLoader} from "./test-group-corrector.loader";
import {TestGroupSecretaryLoader} from "./test-group-secretary.loader";


@Injectable({providedIn: "root"})
export class UserLoader implements EntityLoader<User, string> {

  constructor(private _httpClient: UserHttpClient,
              private _groupLoader: GroupLoader,
              private _testLoader: TestLoader,
              private _studentLoader: StudentLoader,
              private _testGroupLoader: TestGroupLoader,
              private _testGroupCorrectorLoader: TestGroupCorrectorLoader,
              private _testGroupSupervisorLoader: TestGroupSupervisorLoader,
              private _testGroupSecretaryLoader: TestGroupSecretaryLoader,
              private _specialityLoader: SpecialityLoader,
              private _examinationLoader: ExaminationLoader) {
  }

  async load(item: User): Promise<User> {
    const userModel = await this._httpClient.userModel(item.id);

    item.examinations = List.fromArray(userModel.examinations.map(e => new Examination(e)));
    await this._examinationLoader.loadAll(item.examinations);

    item.tests = List.fromArray(userModel.tests.map(t => new Test(t)));
    await this._testLoader.loadAll(item.tests);

    item.testGroups = List.fromArray(userModel.testGroups.map(t => new TestGroup(t)));
    await this._testGroupLoader.loadAll(item.testGroups);

    item.students = List.fromArray(userModel.students.map(s => new Student(s)));
    await this._studentLoader.loadAll(item.students);

    item.testGroupCorrectors = List.fromArray(userModel.testGroupCorrectors.map(t => new TestGroupCorrector(t)));
    await this._testGroupCorrectorLoader.loadAll(item.testGroupCorrectors);

    item.testGroupSupervisors = List.fromArray(userModel.testGroupSupervisors.map(t => new TestGroupSupervisor(t)));
    await this._testGroupSupervisorLoader.loadAll(item.testGroupSupervisors);

    item.testGroupSecretaries = List.fromArray(userModel.testGroupSecretaries.map(t => new TestGroupSecretary(t)));
    await this._testGroupSecretaryLoader.loadAll(item.testGroupSecretaries);

    return item;
  }

  async loadById(id: string): Promise<User> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }


  async loadAll(users: List<User>) {
    for (const user of users) {
      await this.load(user);
    }
  }
}
