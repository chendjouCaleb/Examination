import {Injectable} from '@angular/core';
import {SchoolLoader} from '../organisation';
import {Loader} from '../loader';
import {MemberHttpClient, UserHttpClient} from 'examination/models/http';
import {Member} from 'examination/entities';


@Injectable({providedIn: 'root'})
export class MemberLoader extends Loader<Member, number> {

  constructor(private memberRepository: MemberHttpClient,
              private _userHttClient: UserHttpClient,
              private _schoolLoader: SchoolLoader) {
    super(memberRepository);
  }

  async load(item: Member): Promise<Member> {
    if (item.userId) {
      item.user = await this._userHttClient.findAsync(item.userId);
    }
    item.school = await this._schoolLoader.loadById(item.schoolId);
    return item;
  }


}
