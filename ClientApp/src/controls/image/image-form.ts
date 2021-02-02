import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild
} from "@angular/core";
import Cropper from "cropperjs";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";


export const IMAGE_FORM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ImageForm),
  multi: true
};

export interface ImageFormValue {
  blob?: Blob,
  url?: string
}

@Component({
  templateUrl: 'image-form.html',
  selector: 'image-form, [image-form]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IMAGE_FORM_VALUE_ACCESSOR]
})
export class ImageForm implements AfterViewInit, ControlValueAccessor{
  /** The title of the form. */
  @Input()
  title: string;

  /** The url of the default image. */
  @Input()
  defaultImageUrl: string;

  @Output()
  onchange = new EventEmitter<ImageFormValue>();

  @Input()
  ratio = 1;


  @ViewChild("imageElement")
  _imageElement: ElementRef<HTMLImageElement>;

  _cropper: Cropper;

  _value: ImageFormValue = {};

  _resizeMode = false;

  _imageUrl: string;

  constructor(private _changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      if(this.defaultImageUrl) {
        this._imageUrl = this.defaultImageUrl;
        this.startResize();
        this._changeDetector.markForCheck();
        console.log("There are image")
      }

    })
  }


  loadImage(inputImage: HTMLInputElement) {
    if (inputImage.files.length === 0) {
      return;
    }
    const file = inputImage.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      this._imageUrl = event.target.result.toString();
      this.startResize();
    });
    reader.readAsDataURL(file);
  }

  startResize() {
    if (this._cropper) {
      this._cropper.destroy();
    }
    this._resizeMode = true;
    this._imageElement.nativeElement.src = this._imageUrl;

    this._cropper = new Cropper(this._imageElement.nativeElement, {aspectRatio: this.ratio});

    this._changeDetector.markForCheck();
  }


  endResize() {
    const canvas = this._cropper.getCroppedCanvas({width: 400, height: 400});
    canvas.toBlob((blob) => {

      this._value.blob = blob;
      this._onChange(this._value);
      this.onchange.emit(this._value);
    });

    this._value.url = canvas.toDataURL();
    this._imageElement.nativeElement.src = this._value.url;


    this._cropper.destroy();
    this._cropper = null;
    this._resizeMode = false;
  }

  ngOnDestroy(): void {
    if (this._cropper) {
      this._cropper.destroy();
    }

    this._imageUrl = null;
    this._value = null;
  }

  /** `View -> model callback called when value changes` */
  _onChange: (value: any) => void = () => { };

  /** `View -> model callback called when select has been touched` */
  _onTouched = () => { };

  registerOnChange(fn: any): void {

    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  writeValue(obj: any): void { }
}
