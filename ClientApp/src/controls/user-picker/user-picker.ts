import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {msfSelectAnimations, PersonaSize} from 'fabric-docs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {UserHttpClient} from 'examination/models';


/**
 * Provider Expression that allows Checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const USER_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UserPicker),
  multi: true
};

export interface UserPickerItem {
  id: string;
  fullName: string;
  username: string;
  hasImage: boolean;
  imageUrl: string;
}

let uniqueId = 0;

@Component({
  templateUrl: 'user-picker.html',
  selector: 'user-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [USER_PICKER_CONTROL_VALUE_ACCESSOR],
  animations: [
    msfSelectAnimations.transformPanelWrap,
    msfSelectAnimations.transformPanel
  ],
  styleUrls: ['user-picker.scss'],
  host: {
    class: 'user-picker'
  }
})
export class UserPicker implements OnInit, ControlValueAccessor {
  @Input()
  searchFn: (input: string, take: number) => Promise<UserPickerItem[]> = this._userHttpClient.searchFn;

  @Input()
  maxSize: number;

  @Input()
  itemSize: number = 6;

  @Input()
  personaSize: PersonaSize = 'size32';

  @Input()
  name: string = `user-picker-${uniqueId++}`;

  change: EventEmitter<UserPickerItem[]> = new EventEmitter<UserPickerItem[]>();

  values: UserPickerItem[] = [];


  _items: UserPickerItem[] = [];

  _openPanel: boolean = false;

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _userHttpClient: UserHttpClient) {
  }

  ngOnInit(): void {
    if (!this.searchFn) {
      throw new Error('You must provide a non null searchFn');
    }

    Promise.resolve().then(() => {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
    });
  }


  close() {
    this._openPanel = false;
    this._changeDetectorRef.markForCheck();
  }

  async _inputFocus() {
    await this.searchItems('');
    this._openPanel = true;
    this._changeDetectorRef.markForCheck();
  }

  _keypress(value: string) {
    this.searchItems(value);
  }

  async searchItems(value: string) {
    let _result = await this.searchFn(value, 5);
    _result = _result.filter(item => this.values.findIndex(v => v.id === item.id) < 0);
    _result = _result.slice(0, this.itemSize);
    this._items = _result;

    this._changeDetectorRef.markForCheck();
  }

  select(item: UserPickerItem) {
    if (this.maxSize && this.values.length >= this.maxSize) {
      return;
    }
    if (this.values.find(i => i.id === item.id)) {
      return;
    }

    this.values.push(item);
    this.change.emit(this.values);
    this._controlValueAccessorChangeFn(this.getValue());
    this._changeDetectorRef.markForCheck();
    this.close();
  }

  removeValue(value: UserPickerItem) {
    this.values = this.values.filter(item => item !== value);
    this.change.emit(this.values);
    this._controlValueAccessorChangeFn(this.getValue());
    this._changeDetectorRef.markForCheck();
  }

  blur() {
    this._openPanel = false;
  }

  get openPanel() {
    return this._openPanel;
  }

  private _onTouched: () => any = () => {
  };
  private _controlValueAccessorChangeFn: (value: any) => void = () => {
  };

  registerOnChange(fn: any): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.values = obj;
    }
  }

  get value(): UserPickerItem {
    if (this.values.length > 0) {
      return this.values[0];
    }
    return null;
  }

  getValue(): UserPickerItem | UserPickerItem[] | null {
    if (this.maxSize === 1) {
      return this.value;
    }
    return this.values;
  }

  getInitial(name: string) {
    const values = name.trim().split(' ');
    let initial = values[0][0] || '';
    if(values.length > 1) {
      initial += values[1][0] || '';
    }
    return initial.toUpperCase();
  }
}
