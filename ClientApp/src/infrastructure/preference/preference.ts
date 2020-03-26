import {ReplaySubject} from 'rxjs';
import {Dictionary} from '@positon/collections';
import {IPreference} from './preference.interface';

export const APP_PREFERENCE_KEY = 'app-preference';

export const DEFAULT_PREFERENCES = {
  backgroundImage: '/assets/orion.jpg',
  backgroundBlur: 10,
  opacity: 0.8,
  collapseSidebar: false,
  themeColor: 'blue',
  themeMode: 'light'
};


export class Preference implements IPreference {
  constructor() {
    // this._loadProperties();
    // if (this.properties.isEmpty()) {
    //   this._setDefaultProperties();
    //   this.save();
    // }
  }

  private _properties = new Dictionary<string, any>();

  private _observers = new Dictionary<string, ReplaySubject<any>>();


  /**
   * Gets a property by key.
   * @param key The key of the property.
   */
  get(key: string): any {
    return this._properties.get(key);
  }

  /**
   * Sets a new property.
   * @param key The key of the property.
   * @param value The value of the property.
   * @param persist Whether the property will be update in the localStorage.
   */
  set(key: string, value: any, persist: boolean = false) {
    this.add(key);
    this._properties.put(key, value);
    this.observers.get(key).next(value);

    if (persist) {
      this.save();
    }
  }

  /**
   * Add a property without value.
   * @param key The key of the new property.
   */
  add(key: string) {
    if (!this.has(key)) {
      this._properties.put(key, '');
      this.observers.put(key, new ReplaySubject<any>());
    }
  }


  /**
   * Whether the property exists.
   * @param key The key of the property.
   */
  has(key: string): boolean {
    return this._properties.containsKey(key);
  }

  /**
   * Removes a property.
   * @param key The key of the property to remove.
   * @param persist Whether the property is also removed in localStorage.
   */
  remove(key: string, persist: boolean) {
    this._properties.remove(key);
    this.observers.remove(key);

    if (persist) {
      this.save();
    }
  }


  getObserver(key: string): ReplaySubject<any> {
    if (!this.observers.containsKey(key)) {
      this._observers.put(key, new ReplaySubject<any>());
    }

    return this._observers.get(key);
  }

  dict(): { [key: string]: any } {
    const values: { [key: string]: any } = {};

    this._properties.forEach(kvp => {
      values[kvp.key] = kvp.value;
    });

    return values;
  }

  public save() {
    const strValues = JSON.stringify(this.dict());
    localStorage.setItem(APP_PREFERENCE_KEY, strValues);
  }

  /**
   * Load properties form localStorage.
   */
  public loadProperties() {
    const store = localStorage.getItem(APP_PREFERENCE_KEY);

    if (!store) {
      return;
    }

    const values: { [key: string]: any } = JSON.parse(store);

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        this.set(key, values[key], false);
      }
    }
  }

  _setDefaultProperties() {
    const values = DEFAULT_PREFERENCES;
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        this.set(key, values[key], false);
      }
    }
  }


  get observers(): Dictionary<string, ReplaySubject<any>> {
    return this._observers;
  }

  get properties(): Dictionary<string, any> {
    return this._properties;
  }


}

