import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {ExaminationLevelSpeciality, Test, TestLevelSpeciality} from "examination/entities";
import {Injectable} from "@angular/core";
import {List} from "@positon/collections";


@Injectable()
export class TestLevelSpecialityHttpClient extends GenericHttpClient<TestLevelSpeciality, number> {
  url: string = SERVER_URL + "/testLevelSpecialities";


  createFromAny(value: any): TestLevelSpeciality {
    return new TestLevelSpeciality(value);
  }

  listByTest(test: Test): Promise<List<TestLevelSpeciality>> {
    return this.listAsync({testId: test.id});
  }

  listByExaminationLevelSpeciality(examinationLevelSpeciality: ExaminationLevelSpeciality): Promise<List<TestLevelSpeciality>> {
    return this.listAsync({examinationLevelSpecialityId: examinationLevelSpeciality.id});
  }

}
