import {Injectable} from "@angular/core";
import {Speciality, SpecialityHttpClient} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";

@Injectable({providedIn: 'root'})
export class SpecialityService {
  constructor(private _httpClient: SpecialityHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirm: Confirmation) { }

  group(speciality: Speciality): Promise<void> {
    return new Promise<void>((resolve, error) => {
      const confirm = this._confirm.open(`Grouper tous les étudiants de la spécialité ${speciality.name}`);
      confirm.accept.subscribe(async () => {
        await this._httpClient.group(speciality);
        speciality.grouped = true;
        speciality.lastGroupingDate = new Date();
        this._alertEmitter.info("Le groupement a été effectué!");
        resolve();
      }, err  => error(err));
    })

  }

  ungroup(speciality: Speciality): Promise<void> {
    return new Promise<void>((resolve, error) => {
      const confirm = this._confirm.open(`Annuler le groupement de la spécialité ${speciality.name}`);
      confirm.accept.subscribe(async () => {
        await this._httpClient.ungroup(speciality);
        speciality.grouped = false;
        this._alertEmitter.error("Le groupement a été annulée!");
        resolve();
      }, err  => error(err));
    })

  }
}
