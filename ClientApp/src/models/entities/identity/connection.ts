import {Entity} from "../entity";
import {User} from "./user.entity";

export class Connection extends Entity<number> {
  browser: string;
  remoteAddress: string;
  os: string;
  isPersistent: boolean;
  beginDate: Date;
  endDate: Date;

  user: User;
  userId: string;

  get isClosed() {
    return this.endDate != null;
  }

  static createFromAny(value: any) : Connection {
    if(!value) {
      return null;
    }

    const connection = new Connection();

    connection.id = value.id;
    connection.registrationDate = value.registrationDate;

    connection.browser = value.navigator;
    connection.remoteAddress = value.remoteAddress;
    connection.os = value.os;
    connection.isPersistent = value.isPersistent;
    connection.beginDate = value.beginDate;
    connection.endDate = value.endDate;

    connection.user = User.createFromAny(value.user);
    connection.userId = value.userId;

    return connection;
  }
}

