import {Injectable} from "@angular/core";
import {EntityLoader} from "./entity-loader.interface";
import {Group, Examination} from "../entities";
import {GroupHttpClient, UserHttpClient} from "../httpClient";
import {ExaminationLoader} from "./examination.loader";
import {List} from "@positon/collections";
import {SpecialityLoader} from "./speciality.loader";
import {RoomLoader} from "./room.loader";


@Injectable({providedIn: "root"})
export class GroupLoader implements EntityLoader<Group, number> {

  constructor(private groupRepository: GroupHttpClient,
              private _userHttClient: UserHttpClient,
              private _roomLoader: RoomLoader,
              private _specialityLoader: SpecialityLoader,
              private _examinationLoader: ExaminationLoader) {
  }

  async load(item: Group): Promise<Group> {
    if(item.registerUserId){
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }

    if(item.specialityId) {
      item.speciality = await this._specialityLoader.loadById(item.specialityId);
    }

    if(item.roomId) {
      item.room = await this._roomLoader.loadById(item.roomId);
    }

    item.examination = await this._examinationLoader.loadById(item.examinationId);
    return item;
  }

  async loadById(id: number): Promise<Group> {
    const item = await this.groupRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByExamination(examination: Examination): Promise<List<Group>> {
    const groups = await this.groupRepository.listAsync({examinationId: examination.id});
    for (const group of groups) {
      await this.load(group);
    }

    return groups;
  }

  async loadAll(groups: List<Group>) {
    for (const group of groups) {
      await this.load(group);
    }
  }
}
