import {Injectable} from '@angular/core';

import {AuthorizationManager} from 'examination/app/authorization';
import {School} from 'examination/entities';
import {Loader} from '../loader';
import {SchoolHttpClient, UserHttpClient} from 'examination/models/http';


@Injectable({providedIn: 'root'})
export class SchoolLoader extends Loader<School, number> {

  constructor(private httpClient: SchoolHttpClient,
              private _userHttClient: UserHttpClient,
              private _authorization: AuthorizationManager) {
    super(httpClient);
  }

  async load(item: School): Promise<School> {
    item.principalUser = await this._userHttClient.findAsync(item.principalUserId);

    await this._authorization.getAuthorizationState();
    item.userPrincipal.isPrincipal = item.principalUserId === this._authorization.user?.id;

    if (item.hasImage) {
      item.imageUrl = this.httpClient.getImageUrl(item);
    }


    if (item.hasCoverImage) {
      item.coverImageUrl = this.httpClient.getCoverImageUrl(item);
    } else {
      item.coverImageUrl = 'https://cdn.spacetelescope.org/archives/images/wallpaper1/heic1307a.jpg';
    }
    return item;
  }

  async loadById(id: number): Promise<School> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }
}
