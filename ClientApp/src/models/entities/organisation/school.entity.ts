import {Entity} from '../entity';
import {User} from '../identity/user.entity';
import {Application, Planner} from '../member';
import {List} from '@positon/collections';
import {Department} from './department.entity';
import {Room} from './room.entity';
import {Examination} from '../examination';

export class School extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.name = value.name;
      this.address = value.address;
      this.identifier = value.identifier;

      this.statistics = value.statistics;

      this.acronym = value.acronym;

      this.principalUserId = value.principalUserId;
      this.principalUser = value.principalUser;

      this.hasImage = value.hasImage;
      this.imageUrl = value.imageUrl;

      this.isPlanner = value.isPlanner;
      this.isPrincipalUser = value.isPrincipalUser;

      this.hasCoverImage = value.hasCoverImage;
      this.coverImageUrl = value.coverImageUrl;
    }
  }

  principalUserId: string;
  principalUser: User;

  name: string;
  identifier: string;
  acronym: string;

  address: string;

  hasImage: boolean;
  imageUrl: string;

  isPlanner: boolean;
  isPrincipalUser: boolean;

  hasCoverImage: boolean;
  coverImageUrl: string;

  planners: List<Planner>;

  departments: List<Department>;

  applications: List<Application>;

  rooms: List<Room>;

  examinations: List<Examination>;

  userPrincipal: SchoolUser = {};

  statistics: SchoolStatistics = {};

  addRoom(room: Room) {
    this.rooms?.insert(0, room);
  }

  removeRoom(room: Room) {
    this.rooms?.removeIf(r => r.id === room.id);
  }

  get url(): string {
    return `/schools/${this.id}`;
  }

}


export class SchoolStatistics {
  adminCount?: number = 0;
  examinationCount?: number = 0;
  waitingExaminationCount?: number = 0;
  progressExaminationCount?: number = 0;
  closedExaminationCount?: number = 0;
  roomCount?: number = 0;
  capacity?: number = 0;
}

export interface SchoolUser {
  isPrincipal?: boolean;
  isPlanner?: boolean;
}
