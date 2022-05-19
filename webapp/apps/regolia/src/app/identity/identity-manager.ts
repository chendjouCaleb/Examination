import {Injectable} from "@angular/core";
import {ChangePasswordModel, UserAddModel, UserInfoModel} from "examination/app/identity/identity.model";
import {User} from "examination/entities";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IdentityManager {
  private _baseUrl = '/api/users'
  constructor(private httpClient: HttpClient) {
  }

    async createUser(model: UserAddModel) : Promise<User> {
        const result = await this.httpClient.post<any>(`/api/users`, model).toPromise();
        return User.createFromAny(result);
    }

  async changeInfo(user: User, model: UserInfoModel) {
    await this.httpClient.put<any>(`/api/users/${user.id}/info`, model).toPromise();
  }

  async changePassword(user: User, model: ChangePasswordModel) {
    await this.httpClient.put<any>(`/api/users/${user.id}/password`, model).toPromise();
  }

  async changeImage(user: User, image: Blob): Promise<void> {
    const formData = new FormData();
    formData.append("image", image, 'filename.png');
    return this.httpClient.put<void>(`api/users/${user.id}/image`, formData).toPromise();
  }
}
