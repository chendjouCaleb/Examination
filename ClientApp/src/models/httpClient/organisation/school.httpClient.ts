import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {School, SchoolUser} from 'examination/entities';
import {Injectable} from '@angular/core';


@Injectable()
export class SchoolHttpClient extends GenericHttpClient<School, number> {
  url: string = SERVER_URL + '/schools';


  createFromAny(value: any): School {
    return new School(value);
  }

  async findByIdentifier(identifier: string): Promise<School> {
    const result = this.httpClient.get(`${this.url}/find/identifier/${identifier}`).toPromise();
    if (result) {
      return new School(result);
    }
    return null;
  }

  async clear() {
    const Schools = await this.listAsync();
    for (const item of Schools) {
      await this.delete(item.id);
    }
  }

  async identifier(id: number, identifier: string) {
    return this.httpClient.put(`${this.url}/${id}/identifier?identifier=${identifier}`, {}).toPromise();
  }

  async principal(userId: string) {
    return this.httpClient.put(`${this.url}/principal`, {userId});
  }

  async changeImage(school: School, image: Blob, extension: string = 'png'): Promise<void> {
    const formData = new FormData();
    formData.append('image', image, `image.${extension}`);
    return this.httpClient.put<void>(`${this.url}/${school.id}/image`, formData).toPromise();
  }

  async changeCoverImage(school: School, image: Blob, extension: string = 'png'): Promise<void> {
    const formData = new FormData();
    formData.append('image', image, `image.${extension}`);
    return this.httpClient.put<void>(`${this.url}/${school.id}/coverImage`, formData).toPromise();
  }


  async schoolUser(schoolId: number, userId: string) {
    return this.httpClient
      .get<SchoolUser>(`${this.url}/users?schoolId=${schoolId}&userId=${userId}`)
      .toPromise();
  }

  getImageUrl(school: School): string {
    return `${this.url}/${school.id}/image`;
  }

  getCoverImageUrl(school: School): string {
    return `${this.url}/${school.id}/coverImage`;
  }
}
