import {Injectable} from "@angular/core";
import {Client} from "examination/entities";
import {ClientHttpClient} from "examination/models/http";
import {EntityLoader} from "../entity-loader.interface";

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
