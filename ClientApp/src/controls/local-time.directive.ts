import {Directive, ElementRef, forwardRef, OnDestroy, OnInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {LocalTime} from "@js-joda/core";
import Cleave from "cleave.js";

export const LOCALTIME_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LocalTimeDirective),
  multi: true
};

@Directive({
  selector: '[LocalTimeInput]',
  providers: [LOCALTIME_CONTROL_VALUE_ACCESSOR],
  host: {
    '[attr.autocomplete]': "'off'"
  }
})
export class LocalTimeDirective implements ControlValueAccessor, OnInit, OnDestroy {
  private _mask: Cleave;

  constructor(private _elementRef: ElementRef<HTMLInputElement>) {

  }

  ngOnInit(): void {
    this._mask = new Cleave(this._elementRef.nativeElement, {
      time: true,
      timePattern: ['h', 'm'],

      onValueChanged: (event: any): void => {
        let time: string = event.target.value;
        if (time.length !== 5) {
          this._onChange(null);
        } else {
          this._onChange(LocalTime.parse(time))
        }

      }
    });
  }

  ngOnDestroy(): void {
    this._mask.destroy();
  }

  /** `View -> model callback called when value changes` */
  _onChange: (value: any) => void = () => {
  };

  /** `View -> model callback called when select has been touched` */
  _onTouched = () => {
  };

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  writeValue(obj: LocalTime): void {
    if(obj){
      this._mask.setRawValue(obj.toString());
    }
  }
}
