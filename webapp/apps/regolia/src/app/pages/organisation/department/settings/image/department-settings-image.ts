import {Component, ElementRef, Inject, Input, ViewChild} from "@angular/core";
import {Department} from "examination/entities";
import {IDepartmentService, DEPARTMENT_SERVICE_TOKEN} from "@examination/components";
import {AlertEmitter, ImageFormDialog} from "src/controls";
import {DepartmentHttpClient} from "@examination/http";

@Component({
  templateUrl: 'department-settings-image.html',
  selector: 'department-settings-image'
})
export class DepartmentSettingsImage {
  @Input()
  department: Department;

  @ViewChild('imageElement')
  _imageElement: ElementRef<HTMLImageElement>;

  constructor(@Inject(DEPARTMENT_SERVICE_TOKEN) private _service: IDepartmentService,
              private _alert: AlertEmitter,
              private _imageFormDialog: ImageFormDialog,
              private _httpClient: DepartmentHttpClient) {
  }

  async changeImage() {
    this._imageFormDialog.open().subscribe(async value => {
      if (value.blob) {
        await this._httpClient.changeImage(this.department, value.blob);
        this.department.imageUrl = value.url;

        this._alert.info('Photo mise à jour.');
      }
    })
  }
}
