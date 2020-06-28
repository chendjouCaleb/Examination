import {Injectable} from '@angular/core';
import {EntityLoader} from './entity-loader.interface';
import {ScorePaper} from '../entities';
import {RoomLoader} from './room.loader';
import {TestLoader} from './test.loader';
import {GroupLoader} from './group.loader';


@Injectable({providedIn: 'root'})
export class ScorePaperLoader implements EntityLoader<ScorePaper, number> {

  constructor(private scorePaperRepository: ScorePaperHttpClient,
              private _userHttClient: UserHttpClient,
              private _roomLoader: RoomLoader,
              private _testLoader: TestLoader,
              private _groupLoader: GroupLoader) {
  }

  async load(item: ScorePaper): Promise<ScorePaper> {
    item.test = await this._testLoader.loadById(item.testId);
    return item;
  }

  async loadById(id: number): Promise<ScorePaper> {
    const item = await this.scorePaperRepository.findAsync(id);
    await this.load(item);
    return item;
  }
}
