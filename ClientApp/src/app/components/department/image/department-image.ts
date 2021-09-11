import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Department} from 'examination/entities';
import {DepartmentHttpClient} from 'examination/models/http';
import {MsDialogRef} from '@ms-fluent/components';
import {ImageFormValue} from 'examination/controls';


@Component({
  templateUrl: 'department-image.html',
  selector: 'app-department-image, [app-department-image]',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentImage {
  @Input()
  department: Department;

  value: ImageFormValue;

  constructor(private _httpClient: DepartmentHttpClient,
              private _changeDetector: ChangeDetectorRef,
              private _modal: MsDialogRef<DepartmentImage>) {
  }


  async update() {
    if (!this.value) {
      return;
    }
    await this._httpClient.changeImage(this.department, this.value.blob);
    this.department.imageUrl = this.value.url;
    this._modal.close(true);
    console.log('Image updated');
  }

  onchange(value: ImageFormValue) {
    this.value = value;
    this._changeDetector.detectChanges();
  }

}
