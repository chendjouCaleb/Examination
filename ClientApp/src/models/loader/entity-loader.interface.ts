import {Entity} from "examination/entities";

export interface EntityLoader<T extends Entity<TID>, TID> {
  load(item: T): Promise<T>;
  loadById(id: TID): Promise<T>;
}
