import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Department} from 'examination/entities';
import {DepartmentHttpClient} from 'examination/models/http';
import {MsfModalRef} from 'fabric-docs';
import {ImageFormValue} from 'examination/controls';

/** Change the department cover image */
@Component({
  templateUrl: 'department-cover-image.html',
  selector: 'app-department-cover-image, [app-department-cover-image]',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentCoverImage {
  @Input()
  department: Department;

  value: ImageFormValue;

  constructor(private _httpClient: DepartmentHttpClient,
              private _changeDetector: ChangeDetectorRef,
              private _modal: MsfModalRef<DepartmentCoverImage>) {
  }


  async update() {
    if (!this.value) {
      return;
    }
    await this._httpClient.changeCoverImage(this.department, this.value.blob);
    this.department.coverImageUrl = this.value.url;
    this.department.hasCoverImage = true;
    this._modal.close(true);
  }

  onchange(value: ImageFormValue) {
    this.value = value;
    this._changeDetector.detectChanges();
  }

}
