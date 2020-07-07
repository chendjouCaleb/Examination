import {Injectable} from "@angular/core";
import {Student} from "../entities";
import {StudentHttpClient, UserHttpClient} from "../httpClient";
import {ExaminationLoader} from "./examination.loader";
import {SpecialityLoader} from "./speciality.loader";
import {Loader} from "./loader";
import {GroupLoader} from "./group.loader";


@Injectable({providedIn: "root"})
export class StudentLoader extends Loader<Student, number> {

  constructor(private studentRepository: StudentHttpClient,
              private _userHttClient: UserHttpClient,
              private _groupLoader: GroupLoader,
              private _specialityLoader: SpecialityLoader,
              private _examinationLoader: ExaminationLoader) {
    super(studentRepository);
  }

  async load(item: Student): Promise<Student> {
    if (item.registerUserId) {
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }

    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    if (item.specialityId) {
      item.speciality = await this._specialityLoader.loadById(item.specialityId);
    }

    if (item.groupId) {
      item.group = await this._groupLoader.loadById(item.groupId);
    }

    item.examination = await this._examinationLoader.loadById(item.examinationId);
    return item;
  }


}
