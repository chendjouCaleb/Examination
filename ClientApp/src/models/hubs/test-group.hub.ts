import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import { Subject} from "rxjs";

import {environment} from "../../environments/environment";
import {TestGroup} from "examination/entities";
import {TestGroupLoader} from "examination/loaders";

@Injectable({
  providedIn: 'root'
})
export class TestGroupHub {
  public readonly connection: HubConnection;


  private readonly _testGroupCreated = new Subject<TestGroup>();
  private readonly _testGroupDeleted = new Subject<TestGroup>();
  private readonly _testGroupStarted = new Subject<TestGroup>();
  private readonly _testGroupEnded = new Subject<TestGroup>();
  private readonly _testGroupRestarted = new Subject<TestGroup>();



  get testGroupCreated(): Subject<TestGroup> {
    return this._testGroupCreated;
  }

  get testGroupDeleted(): Subject<TestGroup> {
    return this._testGroupDeleted;
  }

  get testGroupStarted(): Subject<TestGroup> {
    return this._testGroupStarted;
  }

  get testGroupEnded(): Subject<TestGroup> {
    return this._testGroupEnded;
  }

  get testGroupRestarted(): Subject<TestGroup> {
    return this._testGroupRestarted;
  }


  constructor(private _loader: TestGroupLoader) {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.HUB_URL}/testGroups`).build();


    this.connection.on("TestGroupCreated", (value) => {
      this._loader.load(new TestGroup(value)).then((testGroup) => {
        this._testGroupCreated.next(testGroup);
      })
    });

    this.connection.on("TestGroupDeleted", async (value) => {
      const testGroup = await this._loader.load(new TestGroup(value));
      this._testGroupDeleted.next(testGroup);
    });

    this.connection.on("TestGroupStarted", async (value) => {
      this._testGroupStarted.next(await this._loader.load(new TestGroup(value)));
    });

    this.connection.on("TestGroupEnded", async (value) => {
      this._testGroupEnded.next(await this._loader.load(new TestGroup(value)));
    });

    this.connection.on("TestGroupRestarted", async (value) => {
      this._testGroupRestarted.next(await this._loader.load(new TestGroup(value)));
    });


    this.connection.start().then(() => console.log("TestGroup hub is ok!")).catch(error => console.error(error));

    this.connection.onclose((error) => {
      console.log(error)
    })
  }

}
