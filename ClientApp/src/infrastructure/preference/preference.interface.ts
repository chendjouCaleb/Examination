import {Dictionary} from '@positon/collections';
import {ReplaySubject} from 'rxjs';

export interface IPreference {
  readonly observers: Dictionary<string, ReplaySubject<any>>;
  readonly properties: Dictionary<string, any>;

  /**
   * Gets a property by key.
   * @param key The key of the property.
   */
  get(key: string): any;

  /**
   * Sets a new property.
   * @param key The key of the property.
   * @param value The value of the property.
   * @param persist Whether the property will be update in the localStorage.
   */
  set(key: string, value: any, persist: boolean): void;

  /**
   * Add a property without value.
   * @param key The key of the new property.
   */
  add(key: string): void;

  /**
   * Whether the property exists.
   * @param key The key of the property.
   */
  has(key: string): boolean;

  /**
   * Removes a property.
   * @param key The key of the property to remove.
   * @param persist Whether the property is also removed in localStorage.
   */
  remove(key: string, persist: boolean): void;

  dict(): { [key: string]: any };
}
