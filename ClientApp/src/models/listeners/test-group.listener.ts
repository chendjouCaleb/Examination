import {Inject, Injectable} from "@angular/core";
import {TestGroupHub} from "examination/hubs";
import {  AuthorizationManager} from "examination/app/authorization";
import {IListenerAlert, LISTENER_ALERT_SERVICE_TOKEN} from "./listener-alert.interface";
import {TestGroup} from "examination/entities";

@Injectable()
export class TestGroupHubListener {

  testGroupStartedSubscription = (testGroup: TestGroup) => {
    if(this._identity.user.isAffectedByTestGroup(testGroup)) {
      this._alert.info(`Le groupe ${testGroup.group.name} de l'épreuve ${testGroup.test.name} (${testGroup.test.code}) vient de débuter.`)
    }
  };

  testGroupEndedSubscription = (testGroup: TestGroup)  => {
    if(this._identity.user.isAffectedByTestGroup(testGroup)) {
      this._alert.info(`Le groupe ${testGroup.group.name} de l'épreuve ${testGroup.test.name} (${testGroup.test.code}) vient de terminer.`)
    }
  };

  testGroupRestartedSubscription = (testGroup: TestGroup) => {
    if(this._identity.user.isAffectedByTestGroup(testGroup)) {
      this._alert.info(`Le groupe ${testGroup.group.name} de l'épreuve ${testGroup.test.name} (${testGroup.test.code}) est à nouveau en cours.`)
    }
  };

  constructor(private _hub: TestGroupHub,
              private _identity: AuthorizationManager,
              @Inject(LISTENER_ALERT_SERVICE_TOKEN) private _alert: IListenerAlert) {
  }

  listen() {
    this._hub.testGroupStarted.subscribe(this.testGroupStartedSubscription);
    this._hub.testGroupRestarted.subscribe(this.testGroupRestartedSubscription);
    this._hub.testGroupEnded.subscribe(this.testGroupEndedSubscription);
  }
}
