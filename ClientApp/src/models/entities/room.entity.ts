import {Entity} from './entity';
import {Organisation} from './organisation';
import {User} from './user.entity';

export class Room extends Entity<number> {

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.registrationDate = value.registrationDate;
      this.name = value.name;

      this.capacity = value.capacity;
      this.address = value.address;

      this.organisation = value.organisation;
      this.organisationId = value.organisationId;

      this.registerUserId = value.registerUserId;
      this.registerUser = value.registerUser;
    }
  }

  name: string;
  capacity: number;
  address: string;

  organisation: Organisation;
  organisationId: number;

  registerUserId: string;
  registerUser: User;

  get url(): string {
    return `/organisations/${this.organisationId}/rooms/${this.id}`;
  }
}
