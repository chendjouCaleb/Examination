import {Entity} from './entity';
import {Client} from './client.entity';
import {Connection} from './connection.entity';

export class Authorization extends Entity<number> {
  client: Client;
  clientId: string;

  connection: Connection;
  connectionId: number;

  accessToken: string;
  refreshToken: string;

  static createFromAny(value: any): Authorization {
    if (!value) {
      return null;
    }

    const authorization = new Authorization();
    authorization.id = value.authorization;
    authorization.registrationDate = value.registrationDate;
    authorization.connection = Connection.createFromAny(value.authorization);
    authorization.connectionId = value.connectionId;
    authorization.accessToken = value.accessToken;
    authorization.refreshToken = value.refreshToken;

    authorization.clientId = value.clientId;
    authorization.client = Client.createFromAny(value.client);

    return authorization;
  }
}

export class AddAuthorizationModel {
  clientId: string;
  secretCode: string;
  connectionId: number;
}
