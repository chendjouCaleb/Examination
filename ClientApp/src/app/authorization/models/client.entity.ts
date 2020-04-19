import {Entity} from './entity';

export class Client extends Entity<string> {
  name: string;
  redirectURL: string;
  secretCode: string;
  imageName: string;
  imageURL: string;

  static createFromAny(value: any): Client {
    if (!value) {
      return null;
    }
    const client = new Client();

    client.id = value.id;
    client.registrationDate = value.registrationDate;
    client.name = value.name;
    client.redirectURL = value.redirectURL;
    client.secretCode = value.secretCode;
    client.imageName = value.imageName;
    client.imageURL = value.imageURL;

    return client;
  }
}
