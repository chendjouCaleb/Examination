import {Injectable} from "@angular/core";
import {Group, GroupHttpClient} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";

@Injectable({providedIn: 'root'})
export class GroupService {
  constructor(private _httpClient: GroupHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirm: Confirmation) { }
              
  ungroup(group: Group): Promise<void> {
    return new Promise<void>((resolve, error) => {
      const confirm = this._confirm.open(`Annuler le groupement de ce groupe`);
      confirm.accept.subscribe(async () => {
        await this._httpClient.ungroup(group);
        this._alertEmitter.error("Le groupement a été annulée!");
        resolve();
      }, err  => error(err));
    })

  }
}
