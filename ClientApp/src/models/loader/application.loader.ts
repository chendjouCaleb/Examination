import {Injectable} from "@angular/core";
import {Application} from "../entities";
import {ApplicationHttpClient, UserHttpClient} from "../httpClient";
import {ExaminationLoader} from "./examination.loader";
import {SpecialityLoader} from "./speciality.loader";
import {Loader} from "./loader";
import {StudentLoader} from "./student.loader";
import {AuthorizationManager} from "examination/app/authorization";


@Injectable({providedIn: "root"})
export class ApplicationLoader extends Loader<Application, number> {

  constructor(private _authorization: AuthorizationManager,
              private applicationRepository: ApplicationHttpClient,
              private _userHttClient: UserHttpClient,
              private _studentLoader: StudentLoader,
              private _specialityLoader: SpecialityLoader,
              private _examinationLoader: ExaminationLoader) {
    super(applicationRepository);
  }

  async load(item: Application): Promise<Application> {
    if (item.processUserId) {
      item.processUser = await this._userHttClient.findAsync(item.processUserId);
    }

    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }

    if (item.specialityId) {
      item.speciality = await this._specialityLoader.loadById(item.specialityId);
    }

    if (item.studentId) {
      item.student = await this._studentLoader.loadById(item.studentId);
    }

    if(this._authorization.user && this._authorization.user.id === item.userId) {
      item.isAuthor = true;
    }

    item.examination = await this._examinationLoader.loadById(item.examinationId);
    return item;
  }


}
