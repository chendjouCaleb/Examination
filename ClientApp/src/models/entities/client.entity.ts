import {Entity} from "./entity";

/**
 * Represents a client application for the authorization server.
 */
export class Client extends Entity<string> {
  name: string;
  redirectUrl: string;
  imageUrl: string;
  secretCode: string;

  constructor(value?: any) {
    super();
    if (value) {
      this.id = value.id;
      this.name = value.name;
      this.redirectUrl = value.redirectUrl;
      this.imageUrl = value.imageUrl;
      this.secretCode = value.secretCode
    }
  }
}
