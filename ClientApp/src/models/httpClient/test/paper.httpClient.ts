import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {
  Corrector, ExaminationStudent,
  Paper,
  ScorePaper,
  Secretary,
  Student,
  Supervisor, Test,
  TestGroup,
  TestGroupCorrector,
  TestGroupSecretary,
  TestGroupSupervisor
} from 'examination/entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {IScorePaperModel, PaperPeriodBodyModel, PaperReportModel} from 'examination/models';
import {ItemListResult} from '../itemList';


@Injectable()
export class PaperHttpClient extends GenericHttpClient<Paper, number> {
  url: string = SERVER_URL + '/papers';


  createFromAny(value: any): Paper {
    return new Paper(value);
  }

  listByTest(test: Test): Promise<ItemListResult<Paper>> {
    return this.itemList({testId: test.id});
  }

  listByTestGroup(testGroup: TestGroup): Promise<ItemListResult<Paper>> {
    return this.itemList({testGroupId: testGroup.id});
  }


  listBySecretary(secretary: Secretary): Promise<ItemListResult<Paper>> {
    return this.itemList({secretaryId: secretary.id});
  }


  listBySupervisor(supervisor: Supervisor): Promise<ItemListResult<Paper>> {
    return this.itemList({supervisorId: supervisor.id});
  }


  listByCorrector(corrector: Corrector): Promise<ItemListResult<Paper>> {
    return this.itemList({correctorId: corrector.id});
  }


  listByTestGroupSecretary(testGroupSecretary: TestGroupSecretary): Promise<ItemListResult<Paper>> {
    return this.itemList({testGroupSecretaryId: testGroupSecretary.id});
  }


  listByTestGroupSupervisor(testGroupSupervisor: TestGroupSupervisor): Promise<ItemListResult<Paper>> {
    return this.itemList({testGroupSupervisorId: testGroupSupervisor.id});
  }


  listByTestGroupCorrector(testGroupCorrector: TestGroupCorrector): Promise<ItemListResult<Paper>> {
    return this.itemList({testGroupCorrectorId: testGroupCorrector.id});
  }


  listByStudent(student: Student): Promise<ItemListResult<Paper>> {
    return this.itemList({studentId: student.id});
  }

  listByExaminationStudent(examinationStudent: ExaminationStudent): Promise<ItemListResult<Paper>> {
    return this.itemList({examinationStudentId: examinationStudent.id});
  }

  group(test: Test): Promise<number> {
    return this.httpClient.put<number>(`${this.url}/group`, {},
      {params: {testId: test.id.toString()}}).toPromise();
  }

  countNonGroupedStudents(test: Test): Promise<number> {
    return this.httpClient.get<number>(`${this.url}/countNonGroupedPapers`,
      {params: {testId: test.id.toString()}}).toPromise();
  }

  async addPapers(test: Test): Promise<List<Paper>> {
    const params: any = {testId: test.id};
    const result = await this.httpClient.post<any[]>(`${this.url}`, {}, {params}).toPromise();

    return List.fromArray(result.map<Paper>(u => new Paper(u)));
  }

  presentState(paper: Paper): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${paper.id}/present`, {}).toPromise();
  }

  changeDates(paper: Paper, model: PaperPeriodBodyModel): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${paper.id}/dates`, model).toPromise();
  }


  supervisorComment(paper: Paper, comment: string): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${paper.id}/supervisorComment`, {}, {params: {comment}}).toPromise();
  }

  correctorComment(paper: Paper, comment: string): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${paper.id}/correctorComment`, {}, {params: {comment}}).toPromise();
  }

  collect(paper: Paper, endDate?: Date): Promise<void> {
    const params: any = {};
    if (endDate) {
      params.endDate = endDate.toDateString();
    }
    return this.httpClient.put<void>(`${this.url}/${paper.id}/collect`, {},
      {params}).toPromise();
  }


  report(paper: Paper, model: PaperReportModel): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${paper.id}/report`, model).toPromise();
  }

  score(paper: Paper, score: string): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${paper.id}/score`, {}, {params: {score}}).toPromise();
  }

  scores(paper: Paper, scores: IScorePaperModel[]): Promise<ScorePaper[]> {
    return this.httpClient.put<ScorePaper[]>(`${this.url}/${paper.id}/scores`, scores).toPromise();
  }

  async getScores(paper: Paper): Promise<Array<ScorePaper>> {
    const result = await this.httpClient.get<any[]>(`${this.url}/${paper.id}/scores`).toPromise();
    const list = new Array<ScorePaper>();
    result.forEach(item => list.push(new ScorePaper(item)));
    return list;
  }

}
