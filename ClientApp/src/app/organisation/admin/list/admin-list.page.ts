import {Component, OnInit} from "@angular/core";
import {Admin, AdminHttpClient, AdminLoader, Organisation} from "src/models";
import {CurrentItems} from "src/app/current-items";
import {List} from "@positon/collections";
import {MatDialog} from "@angular/material/dialog";
import {AdminAddComponent} from "../add/admin-add.component";
import {AdminEditComponent} from "../edit/admin-edit.component";
import {Confirmation} from "../../../../controls/confirmation/confirmation";
import {AlertEmitter} from "../../../../controls/alert-emitter";

@Component({
  templateUrl: 'admin-list.page.html',
  selector: 'admin-list'
})
export class AdminListPage implements OnInit {

  organisation: Organisation;
  admins: List<Admin>;

  constructor(private currentItems: CurrentItems, private _adminLoader: AdminLoader,
              private _httpClient: AdminHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _dialog: MatDialog) {
    this.organisation = currentItems.get('organisation');
  }

  async ngOnInit() {
    this.admins = await this._adminLoader.loadByOrganisation(this.organisation);
  }

  openAddAdminDialog() {
    const modalRef = this._dialog.open(AdminAddComponent, {data: {organisation: Organisation}});
    modalRef.componentInstance.organisation = this.organisation;
    modalRef.afterClosed().subscribe(result => {
      if(result) {
        this.admins.insert(0, result);
      }
    })
  }

  openEditDialog(admin: Admin) {
    const modalRef = this._dialog.open(AdminEditComponent );
    modalRef.componentInstance.admin = admin;
  }

  delete(admin: Admin) {
    const result = this._confirmation.open("Voulez-vous Supprimer cet administrateur?");
    result.accept.subscribe(async () => {
      await this._httpClient.delete(admin.id);
      this.admins.remove(admin);
      this._alertEmitter.info("L'administrateur a été supprimé!")
    })
  }
}
