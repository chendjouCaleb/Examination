import {Entity} from "./entity";
import {User} from "./user.entity";

export class Organisation extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.name = value.name;
      this.address = value.address;
      this.identifier = value.identifier;

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


}
