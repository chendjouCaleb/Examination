import {Entity} from "../entities/entity";

export interface EntityLoader<T extends Entity<TID>, TID> {
  load(item: T): Promise<T>;
  loadById(id: TID): Promise<T>;
}
