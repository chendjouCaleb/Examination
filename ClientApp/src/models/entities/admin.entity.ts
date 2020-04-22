import {Entity} from "./entity";
import {User} from "./user.entity";
import {Organisation} from "./organisation";

export class Admin extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;
      this.role = value.role;
      this.organisation = value.organisation;
      this.organisationId = value.organisationId;

      this.userId = value.userId;
      this.user = value.user;

      this.registerUserId = value.registerUserId;
      this.registerUser = value.registerUser;
    }
  }

  userId: string;
  user: User;

  registerUserId: string;
  registerUser: User;

  role: string;
  organisation: Organisation;
  organisationId: number;

}
