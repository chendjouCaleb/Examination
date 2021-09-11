import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {School} from 'examination/entities';
import {SchoolHttpClient} from 'examination/models/http';
import {MsDialogRef} from '@ms-fluent/components';
import {ImageFormValue} from 'examination/controls';

/** Change he school cover image */
@Component({
  templateUrl: 'school-cover-image.html',
  selector: 'app-school-cover-image, [app-school-cover-image]',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolCoverImage {
  @Input()
  school: School;

  value: ImageFormValue;

  constructor(private _httpClient: SchoolHttpClient,
              private _changeDetector: ChangeDetectorRef,
              private _modal: MsDialogRef<SchoolCoverImage>) {
  }


  async update() {
    if (!this.value) {
      return;
    }
    await this._httpClient.changeCoverImage(this.school, this.value.blob);
    this.school.coverImageUrl = this.value.url;
    this.school.hasCoverImage = true;
    this._modal.close(true);
  }

  onchange(value: ImageFormValue){
    this.value = value;
    this._changeDetector.detectChanges();
  }

}
