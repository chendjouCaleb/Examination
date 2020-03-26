import {Injectable} from "@angular/core";
import {Client} from "../entities/client.entity";
import {EntityLoader} from "./entity-loader.interface";
import {ClientHttpClient} from "../httpClient/client.http.client";

@Injectable({providedIn: "root"})
export class ClientLoader implements EntityLoader<Client, string> {

  constructor(private clientRepository: ClientHttpClient) {}

  async load(item: Client): Promise<Client> {
    return item;
  }

  async loadById(id: string): Promise<Client> {
    const item = await this.clientRepository.findAsync(id);
    await this.load(item);
    return item;
  }
}
