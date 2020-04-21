import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

import * as JwtDecode from 'jwt-decode';
import {Claims} from './claims';
import {User} from './models/user.entity';
import {Authorization} from './models/authorization.entity';
import {ITokenModel} from './models/token-model';
import {Connection} from './models/connection.entity';
import {Subject} from 'rxjs';

@Injectable()
export class AuthorizationManager {
  private _isAuthorized: boolean = false;
  private _isInitialized: boolean = false;
  private _user: User;
  private _authorization: Authorization;
  private _connection: Connection;
  private _token: ITokenModel;

  private _stateChange = new Subject<boolean>();

  private _returnUrl: string = environment.AUTH_RETURN_URL;

  private _connectionUrl = environment.AUTH_SERVER_URL + '/connections';
  private _userUrl = environment.AUTH_SERVER_URL + '/users';
  private _authorizationUrl = environment.AUTH_SERVER_URL + '/authorizations';


  constructor(private _httpClient: HttpClient) {
  }

  async init() {
    const accessToken = localStorage.getItem('.Auth.AccessToken');
    const refreshToken = localStorage.getItem('.Auth.RefreshToken');

    if (!accessToken || !refreshToken) {
      this._isInitialized = true;
      this._stateChange.next(false);
      return;
    }

    let token: ITokenModel = {accessToken: accessToken.trim(), refreshToken: refreshToken.trim()};
    token = await this._getOrRefreshToken(token);
    await this.refreshAuthorizationToken(token);
    this._isInitialized = true;
    this._stateChange.next(true);
  }

  async refreshAuthorizationToken(token: ITokenModel) {
    this._saveToken(token);
    this._token = token;
    const result = JwtDecode(token.accessToken);

    this._connection = await this.getConnection(result[Claims.ConnectionId]);
    this._user = await this.getUser(result[Claims.NameIdentifier]);
    this._isAuthorized = true;
  }


  authorize(returnUrl: string) {
    const url = `${environment.AUTH_URL}?callbackUrl=${environment.AUTH_CALLBACK_URL}`
      + `&clientId=${environment.AUTH_CLIENT_ID}`
      + `&secretCode=${environment.AUTH_SECRET_CODE}`
      + `&redirectUrl=${returnUrl}`;

    document.location.href = url;
  }


  private _saveToken(token: ITokenModel) {
    localStorage.setItem('.Auth.AccessToken', token.accessToken);
    localStorage.setItem('.Auth.RefreshToken', token.refreshToken);
  }


  async getUser(id: string): Promise<User> {
    const user = await this._httpClient.get<User>(`${this._userUrl}/${id}`).toPromise();
    return User.createFromAny(user);
  }

  async getConnection(id: number): Promise<Connection> {
    const connection = await this._httpClient.get<Connection>(`${this._connectionUrl}/${id}`).toPromise();
    return Connection.createFromAny(connection);
  }


  private async _getOrRefreshToken(model: ITokenModel): Promise<ITokenModel> {
    return await this._httpClient.post<ITokenModel>(`${this._authorizationUrl}/refreshToken`, model).toPromise();
  }

  getAuthorizationState(): Promise<boolean> {
    if (this._isInitialized) {
      return Promise.resolve(this._isAuthorized);
    }

    return new Promise<boolean>((resolve) => {
      this._stateChange.subscribe(result => {
        resolve(result);
      }, () => resolve(false));
    });
  }


  get isAuthorized(): boolean {
    return this._isAuthorized;
  }

  get user(): User {
    return this._user;
  }

  get connection(): Connection {
    return this._connection;
  }


  get token(): ITokenModel {
    return this._token;
  }
}
