import {Component, OnInit} from '@angular/core';
import {Examination, Principal, PrincipalHttpClient, PrincipalLoader, UserHttpClient} from 'src/models';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {Confirmation} from 'src/controls/confirmation/confirmation';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {PrincipalAddComponent, PrincipalEditComponent} from 'examination/app/principal';
import {MsfModal} from 'fabric-docs';
import {UserPickerItem} from 'examination/app/user-picker';

@Component({
  templateUrl: 'principal-list.page.html',
  selector: 'principal-list'
})
export class PrincipalListPage implements OnInit {

  examination: Examination;
  principals: List<Principal>;
  selectedUser: any;

  users =  [
    {fullName: 'Chendjou Caleb', username: 'chendjoucaleb', id: '1'},
    {fullName: 'Leonel Messi', username: 'leonelmessi', id: '2'},
    {fullName: 'Cristiano Ronaldo', username: 'cristianoronaldo', id: '3'},
    {fullName: 'Issac Newton', id: '4'},
    {fullName: 'Galiléo Galilé', id: '5'},
    {fullName: 'Tafeukeng Ella', id: '6'},
    {fullName: 'Ousama Ben Laden', id: '7'},
    {fullName: 'Vladimir Oulich Oulianov', id: '8'},
    {fullName: 'Nicolas Vavilov', id: '9'},
    {fullName: 'Walter Model', id: '10'},
    {fullName: 'Eric Von Manstein', id: '11'}
  ];

  userSearchFn = async (str: string) => this.users.filter(u => u.fullName.toLowerCase().indexOf(str.toLowerCase()) > -1);

  constructor(private currentItems: CurrentItems, private _principalLoader: PrincipalLoader,
              private _httpClient: PrincipalHttpClient,
              private _userHttpClient: UserHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _modal: MsfModal) {
    this.examination = currentItems.get('examination');
  }

  async ngOnInit() {
    this.principals = await this._principalLoader.loadByExamination(this.examination);
  }

  openAddPrincipalModal() {
    const modalRef = this._modal.open(PrincipalAddComponent, {autoFocus: false, disableClose: true});
    modalRef.componentInstance.examination = this.examination;
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.principals.insert(0, result);
      }
    });
  }

  openEditModal(principal: Principal) {
    const modalRef = this._modal.open(PrincipalEditComponent);
    modalRef.componentInstance.principal = principal;
  }

  delete(principal: Principal) {
    const result = this._confirmation.open('Voulez-vous Supprimer ce délégué?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(principal.id);
      this.principals.remove(principal);
      this._alertEmitter.info('Le délégué a été supprimé!');
    });
  }
}
