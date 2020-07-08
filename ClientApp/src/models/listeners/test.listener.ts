import {Inject, Injectable} from "@angular/core";
import {TestHub} from "examination/hubs";
import {  AuthorizationManager} from "examination/app/authorization";
import {IListenerAlert, LISTENER_ALERT_SERVICE_TOKEN} from "./listener-alert.interface";

@Injectable()
export class TestHubListener {

  testStartedSubscription = test => {
    if(this._identity.user.isAffectedByTest(test)) {
      this._alert.info(`L'épreuve ${test.name} (${test.code}) vient de débuter.`)
    }
  };

  testEndedSubscription = test => {
    if(this._identity.user.isAffectedByTest(test)) {
      this._alert.info(`L'épreuve ${test.name} (${test.code}) vient de s'achever.`)
    }
  };

  testRestartedSubscription = test => {
    if(this._identity.user.isAffectedByTest(test)) {
      this._alert.info(`L'épreuve ${test.name} (${test.code}) est à nouveau en cours.`)
    }
  };

  constructor(private _hub: TestHub,
              private _identity: AuthorizationManager,
              @Inject(LISTENER_ALERT_SERVICE_TOKEN) private _alert: IListenerAlert) {
  }

  listen() {
    this._hub.testStarted.subscribe(this.testStartedSubscription);
    this._hub.testRestarted.subscribe(this.testRestartedSubscription);
    this._hub.testEnded.subscribe(this.testEndedSubscription);
  }
}
