import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {Observable, ReplaySubject} from "rxjs";
import {TestGroup} from "examination/models";
import {CurrentItems} from "examination/app/current-items";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TestGroupHub {
  public readonly connection: HubConnection;


  private readonly _testGroupCreated = new ReplaySubject<TestGroup>();
  private readonly _testGroupDeleted = new ReplaySubject<TestGroup>();
  private readonly _testGroupStarted = new ReplaySubject<TestGroup>();
  private readonly _testGroupEnded = new ReplaySubject<TestGroup>();
  private readonly _testGroupRestarted = new ReplaySubject<TestGroup>();
  private readonly _testGroupClosed = new ReplaySubject<TestGroup>();
  private readonly _testGroupOpened = new ReplaySubject<TestGroup>();
  private readonly _testGroupPublished = new ReplaySubject<TestGroup>();
  private readonly _testGroupUnPublished = new ReplaySubject<TestGroup>();

  get testGroupCreated(): Observable<TestGroup> {
    return this._testGroupCreated.asObservable();
  }
  get testGroupDeleted(): Observable<TestGroup> {
    return this._testGroupDeleted.asObservable();
  }
  get testGroupStarted(): Observable<TestGroup> {
    return this._testGroupStarted.asObservable();
  }
  get testGroupEnded(): Observable<TestGroup> {
    return this._testGroupEnded.asObservable();
  }

  get testGroupRestarted(): Observable<TestGroup> {
    return this._testGroupRestarted.asObservable();
  }

  get testGroupClosed(): Observable<TestGroup> {
    return this._testGroupClosed.asObservable();
  }

  get testGroupOpened(): Observable<TestGroup> {
    return this._testGroupOpened.asObservable();
  }

  get testGroupPublished(): Observable<TestGroup> {
    return this._testGroupPublished.asObservable();
  }

  get testGroupUnPublished(): Observable<TestGroup> {
    return this._testGroupUnPublished.asObservable();
  }

  constructor(private _items: CurrentItems) {
    this.connection = new  HubConnectionBuilder()
      .withUrl(`${environment.HUB_URL}/testGroups`).build();

    this.connection.on("TestGroupCreated", (testGroup: TestGroup) => {
      this._testGroupCreated.next(testGroup);
    });

    this.connection.on("TestGroupDeleted", (testGroup: TestGroup) => {
      this._testGroupDeleted.next(testGroup);
    });

    this.connection.on("TestGroupStarted", (testGroup: TestGroup) => {
      this._testGroupStarted.next(testGroup);
    });

    this.connection.on("TestGroupEnded", (testGroup: TestGroup) => {
      this._testGroupEnded.next(testGroup);
    });

    this.connection.on("TestGroupRestarted", (testGroup: TestGroup) => {
      this._testGroupRestarted.next(testGroup);
    });

    this.connection.on("TestGroupClosed", (testGroup: TestGroup) => {
      this._testGroupClosed.next(testGroup);
    });

    this.connection.on("TestGroupOpened", (testGroup: TestGroup) => {
      this._testGroupOpened.next(testGroup);
    });

    this.connection.on("TestGroupPublished", (testGroup: TestGroup) => {
      this._testGroupPublished.next(testGroup);
    });

    this.connection.on("TestGroupUnPublished", (testGroup: TestGroup) => {
      this._testGroupUnPublished.next(testGroup);
    });

    this.connection.start().then(() => console.log( "TestGroup hub is ok!")).catch(error => console.error(error));

    this.connection.onclose((error) => {
      console.log(error)
    })
  }

}
