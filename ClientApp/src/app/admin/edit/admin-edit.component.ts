import {Component, Input, OnInit} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {Admin, AdminHttpClient, AdminLoader, UserHttpClient} from '../../../models';
import {MatDialogRef} from '@angular/material/dialog';
import {AdminEditForm} from '../form';


@Component({
  templateUrl: 'admin-edit.component.html'
})
export class AdminEditComponent implements OnInit {
  form: AdminEditForm;

  @Input()
  admin: Admin;

  constructor(private _httpClient: AdminHttpClient, private _loader: AdminLoader,
              private _userHttpClient: UserHttpClient,
              private _dialogRef: MatDialogRef<AdminEditComponent>,
              private _alertEmitter: AlertEmitter) {
  }


  ngOnInit(): void {
    this.form = new AdminEditForm(this.admin);
  }

  async edit() {
    await this._httpClient.updateAsync(this.admin.id, this.form.getModel());
    this.admin.role = this.form.getModel().role;
    this._alertEmitter.info(`L'administrateur a été modifié.`);
    this._dialogRef.close();
  }


}
