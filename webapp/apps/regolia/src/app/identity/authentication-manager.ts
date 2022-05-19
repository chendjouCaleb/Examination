import {Injectable} from "@angular/core";
import {User} from "examination/entities";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "examination/app/identity/identity.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationManager {
  private _user: User;

  isInitialized: boolean = false;

  get onInitialize(): Observable<User> {
    return this._onInitialize.asObservable();
  }

  private _onInitialize = new Subject<User>();

  private _stateChange = new Subject<void>();

  get stateChange(): Observable<void> {
    return this._stateChange.asObservable();
  }

  returnUrl: string = '/home';

  url: string = '/api/authentication';

  constructor(private  _httpClient: HttpClient) {
    this.initialize().then();
  }

  async initialize(): Promise<void> {
    const user = await this.getLoggedUser();

    if (user) {
      this._user = user;
      console.log(`${this._user.fullName} est connecté`);
    } else {
      console.log('Aucun utilisateur connecté');
    }

    this._onInitialize.next(user);
    this._stateChange.next();
    this.isInitialized = true;

    return Promise.resolve();
  }


  async login(model: LoginModel): Promise<User> {
    const value = await this._httpClient.post(`${this.url}`, model).toPromise();
    this._user = User.createFromAny(value);
    this._stateChange.next();
    return this._user;
  }

  async getUser(): Promise<User> {
    if (this._user) {
      return Promise.resolve(this._user);
    }
    return new Promise(resolve => {
      this._onInitialize.subscribe(u => resolve(u));
    });
  }

  async getLoggedUser(): Promise<User> {
    const result = await this._httpClient.get(`${this.url}/loggedUser`).toPromise();

    if (result) {
      return User.createFromAny(result);
    }
    return null;
  }

  async logout(): Promise<any> {
    await this._httpClient.put(`${this.url}/logout`, {}).toPromise();
    this._stateChange.next();
    this._user = null;
  }

  async loggedIn(): Promise<boolean> {
    if (this.isInitialized) {
      return this.isLoggedIn;
    }
    return new Promise(resolve => {
      this._onInitialize.subscribe(u => resolve(!!u));
    });
  }

  get isLoggedIn() {
    return this._user != null;
  }

  get user(): User {
    return this._user;
  }

  get profileUrl(): string {
    return '/identity/profile';
  }

  get logoutUrl(): string {
    return '/identity/logout';
  }
}
