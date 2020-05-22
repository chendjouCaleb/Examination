import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CurrentItems} from 'src/app/current-items';
import {List} from '@positon/collections';
import {
  Application,
  ApplicationHttpClient,
  ApplicationLoader,
  Examination,
  Speciality
} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";
import {MsfCheckbox, MsfMenuItemCheckbox, MsfModal} from "fabric-docs";
import {ApplicationAddComponent} from '../add/application-add.component';
import {ApplicationService} from "examination/app/application/application.service";


@Component({
  templateUrl: 'application-list.html',
  selector: 'app-application-list'
})
export class ApplicationList implements OnInit, AfterViewInit {


  @Input()
  examination: Examination;

  @Input()
  speciality: Speciality;

  applications: List<Application>;

  constructor(private currentItems: CurrentItems, private _applicationLoader: ApplicationLoader,
              private _httpClient: ApplicationHttpClient,
              public _applicationService: ApplicationService,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _dialog: MsfModal) {

  }

  async ngOnInit() {
    let applications: List<Application>;
    if (this.examination) {
      applications = await this._httpClient.listByExamination(this.examination);
    } else if (this.speciality) {
      applications = await this._httpClient.listBySpeciality(this.speciality);
    }

    await this._applicationLoader.loadAll(applications);
    this.applications = applications;

  }

  openAddApplicationDialog() {
    const modalRef = this._dialog.open(ApplicationAddComponent);
    modalRef.componentInstance.examination = this.examination;
    modalRef.componentInstance.speciality = this.speciality;
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        this.applications.insert(0, result);
      }
    });
  }

  get _examination(): Examination{
    if(this.examination){
      return this.examination;
    }
    return this.speciality.examination;
  }


  delete(application: Application) {
    const result = this._confirmation.open('Voulez-vous Supprimer cette demande?');
    result.accept.subscribe(async () => {
      await this._httpClient.delete(application.id);
      this.applications.remove(application);
      this._alertEmitter.info('La demande a été suppriméé!');
    });
  }

  columns = new List<string>();

  @ViewChildren(MsfMenuItemCheckbox, {read: MsfCheckbox})
  menuCheckbox: QueryList<MsfCheckbox>;

  columnCheckbox: MsfCheckbox[] = [];

  canShow(column: string): boolean {
    return this.columns.contains(column);
  }

  columnState(column: string, state: boolean){
    if(state && !this.columns.contains(column)) {
      this.columns.add(column);
    }

    if(!state && this.columns.contains(column)) {
      this.columns.remove(column);
    }
    localStorage.setItem("applicationListColumns", JSON.stringify(this.columns.toArray()) );
  }

  ngAfterViewInit(): void {
    this.loadColumn();
    this.columnCheckbox = this.menuCheckbox.filter(item => item.name === 'column');
    Promise.resolve().then(() => {
      this.columnCheckbox.forEach(item => {
        item.checked = this.canShow(item.value);
        item.change.subscribe(() => this.columnState(item.value, item.checked));
      });

    })
  }

  loadColumn() {
    const defaultColumns = ["#", 'state', 'name', 'registrationId', 'speciality', 'gender', 'action'];
    const columns = localStorage.getItem("applicationListColumns");
    if(columns) {
      this.columns= List.fromArray(JSON.parse(columns))
    }else{
      localStorage.setItem("applicationListColumns", JSON.stringify(defaultColumns) );
      this.columns= List.fromArray(defaultColumns)
    }
  }

}
