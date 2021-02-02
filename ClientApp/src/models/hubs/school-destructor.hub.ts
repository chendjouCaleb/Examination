import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {Subject} from "rxjs";

import {environment} from "../../environments/environment";
import {School} from "examination/entities";
import {SchoolLoader} from "examination/loaders";

export interface ISchoolDestructorLog {
  school: School;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class SchoolDestructorHub {
  public readonly connection: HubConnection;


  private readonly _log = new Subject<ISchoolDestructorLog>();


  get log(): Subject<ISchoolDestructorLog> {
    return this._log;
  }



  constructor(private _loader: SchoolLoader) {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.HUB_URL}/schoolDestructor`).build();


    this.connection.on("Log", (school: any, message: string) => {
      this._loader.load(new School(school)).then((school) => {
        this._log.next({school, message});
      })
    });



    this.connection.start().then(() => console.log("School destructor hub is ok!"))
      .catch(error => console.error(error));

    this.connection.onclose((error) => {
      console.log(error)
    })
  }

}
