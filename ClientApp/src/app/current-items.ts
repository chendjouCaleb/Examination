import {Dictionary, EnumeratorIterator, ICollection, KeyPairValue} from "@positon/collections";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class CurrentItems {
  private _items = new Dictionary<string, any>();

  find<TValue>(key: string) {
    const item = this._items.get(key);

    return item as TValue;
  }

  containsKey(key: string): boolean {
    return this._items.containsKey(key);
  }

  containsValue(value: any): boolean {
    return this._items.containsValue(value);
  }

  count(): number {
    return this._items.size();
  }

  get(key: string): any | null {
    return this._items.get(key);
  }

  isEmpty(): boolean {
    return this._items.isEmpty();
  }

  keyValues(): ICollection<KeyPairValue<string, any>> {
    return this._items.keyValues();
  }

  keys(): ICollection<string> {
    return this._items.keys();
  }

  put(key: string, value: any): void {
    this._items.put(key, value);
  }

  remove(key: string): boolean {
    return this._items.remove(key);
  }

  values(): ICollection<any> {
    return this._items.values();
  }

  [Symbol.iterator](): EnumeratorIterator<KeyPairValue<string, any>> {
    return this._items[Symbol.iterator]();
  }
}
