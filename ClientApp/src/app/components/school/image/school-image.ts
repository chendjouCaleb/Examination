import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from "@angular/core";
import {School} from "examination/entities";
import {SchoolHttpClient} from "examination/models/http";
import {MsfModalRef} from "fabric-docs";
import {ImageFormValue} from "examination/controls";


@Component({
  templateUrl: 'school-image.html',
  selector: 'app-school-image, [app-school-image]',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolImage {
  @Input()
  school: School;

  value: ImageFormValue;

  constructor(private _httpClient: SchoolHttpClient,
              private _changeDetector: ChangeDetectorRef,
              private _modal: MsfModalRef<SchoolImage>) {
  }


  async update() {
    if (!this.value) {
      return;
    }
    await this._httpClient.changeImage(this.school, this.value.blob);
    this.school.imageUrl = this.value.url;
    this._modal.close(true);
    console.log("Image updated")
  }

  onchange(value: ImageFormValue){
    this.value = value;
    this._changeDetector.detectChanges();
  }

}
