export class HttpClientCache {
  private static _instance = new HttpClientCache();

  private _caches = new Map<string, Map<any, any>>();

  private constructor() { }


  get(key: string): Map<any, any> {
    if(!this._caches.has(key)){
      this._caches.set(key, new Map<any, any>());
    }
    return this._caches.get(key);
  }

  static get instance( ): HttpClientCache {
    return HttpClientCache._instance;
  }
}
