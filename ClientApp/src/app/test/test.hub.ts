import { Injectable } from '@angular/core';
import {HubConnection, default as signalR} from "@microsoft/signalr";
import {Observable, ReplaySubject} from "rxjs";
import {Test} from "examination/models";
import {CurrentItems} from "examination/app/current-items";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TestHub {
  public readonly connection: HubConnection;


  private readonly _testCreated = new ReplaySubject<Test>();
  private readonly _testDeleted = new ReplaySubject<Test>();
  private readonly _testStarted = new ReplaySubject<Test>();
  private readonly _testEnded = new ReplaySubject<Test>();
  private readonly _testRestarted = new ReplaySubject<Test>();
  private readonly _testClosed = new ReplaySubject<Test>();
  private readonly _testOpened = new ReplaySubject<Test>();
  private readonly _testPublished = new ReplaySubject<Test>();
  private readonly _testUnPublished = new ReplaySubject<Test>();

  get testCreated(): Observable<Test> {
    return this._testCreated.asObservable();
  }
  get testDeleted(): Observable<Test> {
    return this._testDeleted.asObservable();
  }
  get testStarted(): Observable<Test> {
    return this._testStarted.asObservable();
  }
  get testEnded(): Observable<Test> {
    return this._testEnded.asObservable();
  }

  get testRestarted(): Observable<Test> {
    return this._testRestarted.asObservable();
  }

  get testClosed(): Observable<Test> {
    return this._testClosed.asObservable();
  }

  get testOpened(): Observable<Test> {
    return this._testOpened.asObservable();
  }

  get testPublished(): Observable<Test> {
    return this._testPublished.asObservable();
  }

  get testUnPublished(): Observable<Test> {
    return this._testUnPublished.asObservable();
  }

  constructor(private _items: CurrentItems) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.HUB_URL}/tests`).build();

    this.connection.on("TestCreated", (test: Test) => {
      this._testCreated.next(test);
    });

    this.connection.on("TestDeleted", (test: Test) => {
      this._testDeleted.next(test);
    });

    this.connection.on("TestStarted", (test: Test) => {
      this._testStarted.next(test);
    });

    this.connection.on("TestEnded", (test: Test) => {
      this._testEnded.next(test);
    });

    this.connection.on("TestRestarted", (test: Test) => {
      this._testRestarted.next(test);
    });

    this.connection.on("TestClosed", (test: Test) => {
      this._testClosed.next(test);
    });

    this.connection.on("TestOpened", (test: Test) => {
      this._testOpened.next(test);
    });

    this.connection.on("TestPublished", (test: Test) => {
      this._testPublished.next(test);
    });

    this.connection.on("TestUnPublished", (test: Test) => {
      this._testUnPublished.next(test);
    });

    this.connection.start().then(() => console.log( "Test hub is ok!")).catch(error => console.error(error));

    this.connection.onclose((error) => {
      console.log(error)
    })
  }

}
