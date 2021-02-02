import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

import JwtDecode from 'jwt-decode';
import {Claims} from './claims';
import {AccessToken} from './models/token-model';
import {Connection} from './models/connection.entity';
import {Subject} from 'rxjs';
import {User} from 'src/models/entities';

@Injectable()
export class AuthorizationManager {
  private _isInitialized: boolean = false;
  private _connection: Connection;

  private _stateChange = new Subject<boolean>();

  private _connectionUrl = environment.AUTH_SERVER_URL + '/connections';
  private _userUrl = environment.AUTH_SERVER_URL + '/users';
  private _accessTokenUrl = environment.SERVER_URL + '/authorize/accessToken';
  private _refreshTokenUrl = environment.SERVER_URL + '/authorize/refreshToken';

  constructor(private _httpClient: HttpClient) { }

  async init() {
    if (!this.accessToken || !this.authCode) {
      this._isInitialized = true;
      this._stateChange.next(false);
      console.log('Authorization manager is initialized!');
      console.log('There is no connected user');
      return;
    }

    if(this.accessToken.expireAt.getDate() < Date.now()) {
      console.log('Access token expired');
      await this.refreshAuthorization();
    }

    this._connection = await this.getConnection(this.accessToken.connectionId);
    console.log('Authorization manager is initialized!');
    console.log(`${this.user.fullName} is logged!`);
    this._isInitialized = true;
    this._stateChange.next(true);
  }

  async validateAccessToken() {

  }

  async refreshAuthorization(){
    this.accessToken = await this.requestRefreshToken(this.accessToken, this.authCode);
    console.log('Access token refreshed');
  }


  async authorize(authCode: string): Promise<void> {
     this.authCode = authCode;

     const accessToken = await this.requestAccessToken(authCode);
     this.accessToken = accessToken;

     const decodedToken = JwtDecode(accessToken.token);

    this._connection = await this.getConnection(decodedToken[Claims.ConnectionId]);

     return Promise.resolve();
  }

  private _accessToken: AccessToken;
  get accessToken(): AccessToken{
    if(this._accessToken){
      return this._accessToken;
    }
    const value = localStorage.getItem('AUTH_ACCESS_TOKEN');
    if(!value) {
      return null;
    }
    this._accessToken = new AccessToken(JSON.parse(value));
    return this._accessToken;
  }

  set accessToken(value: AccessToken) {
    this._accessToken = value;
    localStorage.setItem('AUTH_ACCESS_TOKEN', JSON.stringify(value));
  }

  private _authCode: string;

  get authCode(): string {
    if(this._authCode){
      return this._authCode;
    }
    this._authCode = localStorage.getItem('AUTH_CODE');
    return this._authCode;
  }

  set authCode(authCode: string) {
    this._authCode = authCode;
    localStorage.setItem('AUTH_CODE', authCode);
  }

  requestAuthorizationCode() {
    document.location.href = `${environment.AUTH_CODE_URL}?redirectUri=${environment.AUTH_CALLBACK_URL}`
      + `&clientId=${environment.AUTH_CLIENT_ID}`;
  }

  requestAccessToken(code: string): Promise<AccessToken> {
    const form = new FormData();
    form.append('code', code);
    return this._httpClient.post<AccessToken>(this._accessTokenUrl,  form).toPromise();
  }

  requestRefreshToken(accessToken: AccessToken, code: string): Promise<AccessToken> {
    const form = new FormData();
    form.append('code', code);
    form.append('refreshToken', accessToken.refreshToken);
    form.append('accessToken', accessToken.token);
    return this._httpClient.post<AccessToken>(this._refreshTokenUrl,  form).toPromise();
  }



  async getUser(id: string): Promise<User> {
    const user = await this._httpClient.get<User>(`${this._userUrl}/${id}`).toPromise();
    return User.createFromAny(user);
  }

  async getConnection(id: number): Promise<Connection> {
    const connection = await this._httpClient.get<Connection>(`${this._connectionUrl}/${id}`).toPromise();
    return Connection.createFromAny(connection);
  }


  getAuthorizationState(): Promise<boolean> {
    if (this._isInitialized) {
      return Promise.resolve(this.isAuthorized);
    }

    return new Promise<boolean>((resolve) => {
      this._stateChange.subscribe(result => {
        resolve(result);
      }, () => resolve(false));
    });
  }


  get isAuthorized(): boolean {
    return !!this._connection;
  }

  get user(): User {
    return this._connection?.user;
  }

  get connection(): Connection {
    return this._connection;
  }

}
