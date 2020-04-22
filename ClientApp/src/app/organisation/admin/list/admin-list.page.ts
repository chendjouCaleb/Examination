import {Component, OnInit} from "@angular/core";
import {Admin, AdminLoader, Organisation} from "src/models";
import {CurrentItems} from "src/app/current-items";
import {List} from "@positon/collections";
import {MatDialog} from "@angular/material/dialog";
import {AdminAddComponent} from "../add/admin-add.component";

@Component({
  templateUrl: 'admin-list.page.html',
  selector: 'admin-list'
})
export class AdminListPage implements OnInit {

  organisation: Organisation;
  admins: List<Admin>;

  constructor(private currentItems: CurrentItems, private _adminLoader: AdminLoader, private _dialog: MatDialog) {
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
}
