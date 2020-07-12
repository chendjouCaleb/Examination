import {GenericHttpClient, SERVER_URL} from './httpClient';
import {
  Corrector,
  Paper, ScorePaper,
  Secretary,
  Student,
  Supervisor,
  TestGroup,
  TestGroupCorrector,
  TestGroupSecretary,
  TestGroupSupervisor
} from '../entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {PaperPeriodBodyModel, PaperReportModel, PeriodModel, ScorePaperModel} from 'examination/models';


@Injectable()
export class PaperHttpClient extends GenericHttpClient<Paper, number> {
  url: string = SERVER_URL + '/papers';


  createFromAny(value: any): Paper {
    return new Paper(value);
  }


  listByTestGroup(testGroup: TestGroup): Promise<List<Paper>> {
    return this.listAsync({testGroupId: testGroup.id});
  }


  listBySecretary(secretary: Secretary): Promise<List<Paper>> {
    return this.listAsync({secretaryId: secretary.id});
  }


  listBySupervisor(supervisor: Supervisor): Promise<List<Paper>> {
    return this.listAsync({supervisorId: supervisor.id});
  }


  listByCorrector(corrector: Corrector): Promise<List<Paper>> {
    return this.listAsync({correctorId: corrector.id});
  }


  listByTestGroupSecretary(testGroupSecretary: TestGroupSecretary): Promise<List<Paper>> {
    return this.listAsync({testGroupSecretaryId: testGroupSecretary.id});
  }


  listByTestGroupSupervisor(testGroupSupervisor: TestGroupSupervisor): Promise<List<Paper>> {
    return this.listAsync({testGroupSupervisorId: testGroupSupervisor.id});
  }


  listByTestGroupCorrector(testGroupCorrector: TestGroupCorrector): Promise<List<Paper>> {
    return this.listAsync({testGroupCorrectorId: testGroupCorrector.id});
  }


  listByStudent(student: Student): Promise<List<Paper>> {
    return this.listAsync({studentId: student.id});
  }


  async addPapers(testGroup: TestGroup): Promise<List<Paper>> {
    const params: any = { testGroupId: testGroup.id };
    const result = await this.httpClient.post<any[]>(`${this.url}`, {}, { params }).toPromise();

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
    const params:any = {};
    if(endDate) {
      params.endDate = endDate.toDateString()
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

  scores(paper: Paper, scores: ScorePaperModel[]): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${paper.id}/scores`, scores).toPromise();
  }

  async getScores(paper: Paper): Promise<List<ScorePaper>> {
    const result = await this.httpClient.get<any[]>(`${this.url}/${paper.id}/scores` ).toPromise();
    const list = new List<ScorePaper>();
    result.forEach(item => list.add(new ScorePaper(item)));
    return list;
  }

}
