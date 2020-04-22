import {HttpClient} from "@angular/common/http";
import {GenericHttpClient, SERVER_URL} from "./httpClient";
import {Client} from "../entities";
import {Injectable} from "@angular/core";


@Injectable()
export class ClientHttpClient extends GenericHttpClient<Client, string> {
  url: string = SERVER_URL + "/clients";

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }

  createFromAny(value: any): Client {
    return new Client(value);
  }

  async clear() {
    let clients = await this.listAsync();
    for (const client of clients) {
      await this.delete(client.id);
    }
  }

}
