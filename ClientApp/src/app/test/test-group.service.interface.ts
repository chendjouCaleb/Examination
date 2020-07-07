import {TestGroup} from "examination/models";
import {InjectionToken} from "@angular/core";

export const TEST_GROUP_SERVICE_TOKEN =
  new InjectionToken<ITestGroupService>('TEST_GROUP_SERVICE_TOKEN');

export interface ITestGroupService {
  start(testGroup: TestGroup): Promise<void>;

  end(testGroup: TestGroup): Promise<void>;

  restart(testGroup: TestGroup): Promise<void>;
}
