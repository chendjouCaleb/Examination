import {Entity} from './entity';
import {User} from './user.entity';

export class Organisation extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.name = value.name;
      this.address = value.address;
      this.identifier = value.identifier;

      this.statistics = value.statistics;

      this.userId = value.userId;
      this.user = value.user;

      this.adminUserId = value.adminUserId;
      this.adminUser = value.adminUser;
    }
  }

  userId: string;
  user: User;

  adminUserId: string;
  adminUser: User;

  name: string;
  identifier: string;

  address: string;

  userPrincipal: OrganisationUser = {};

  statistics: OrganisationStatistics = {};

  get url(): string {
    return `/organisations/${this.id}`;
  }

}


export class OrganisationStatistics {
  adminCount?: number = 0;
  examinationCount?: number = 0;
  waitingExaminationCount?: number = 0;
  progressExaminationCount?: number = 0;
  closedExaminationCount?: number = 0;
  roomCount?: number = 0;
  capacity?: number = 0;
}

export interface OrganisationUser {
  isAdmin?: boolean;
  isPrincipal?: boolean;
  userId?: string;
}
