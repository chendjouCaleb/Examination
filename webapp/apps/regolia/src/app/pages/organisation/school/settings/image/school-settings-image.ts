import {Component, ElementRef, Inject, Input, ViewChild} from "@angular/core";
import {School} from "examination/entities";
import {ISchoolService, SCHOOL_SERVICE_TOKEN} from "@examination/components";
import {AlertEmitter, ImageForm, ImageFormDialog} from "src/controls";
import {SchoolHttpClient} from "@examination/http";

@Component({
  templateUrl: 'school-settings-image.html',
  selector: 'school-settings-image'
})
export class SchoolSettingsImage {
  @Input()
  school: School;

  @ViewChild('imageElement')
  _imageElement: ElementRef<HTMLImageElement>;

  constructor(@Inject(SCHOOL_SERVICE_TOKEN) private _service: ISchoolService,
              private _httpClient: SchoolHttpClient,
              private _alert: AlertEmitter,
              private imageForm: ImageFormDialog) {
  }

  async changeImage() {
    this.imageForm.open().subscribe(async value => {
      if (value.blob) {
        await this._httpClient.changeImage(this.school, value.blob);
        this.school.imageUrl = value.url;

        this._alert.info('Photo mise à jour.');
      }
    })
  }
}
