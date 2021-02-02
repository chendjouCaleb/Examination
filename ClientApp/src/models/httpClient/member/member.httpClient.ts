import {GenericHttpClient, SERVER_URL} from '../httpClient';

import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {Member, School} from 'examination/entities';


@Injectable()
export class MemberHttpClient extends GenericHttpClient<Member, number> {
  url: string = SERVER_URL + '/members';


  createFromAny(value: any): Member {
    return new Member(value);
  }

  async findByUserId(school: School, userId: string): Promise<Member> {
    const result = this.httpClient
      .get(`${this.url}/find?schoolId=${school.id}&userId=${userId}`).toPromise();
    if (result) {
      return new Member(result);
    }
    return null;
  }

  listBySchool(school: School): Promise<List<Member>> {
    return this.listAsync({schoolId: school.id});
  }


}
