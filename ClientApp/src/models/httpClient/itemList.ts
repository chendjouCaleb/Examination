import {List} from '@positon/collections';

export interface ItemListModel {
  size?: number;
  take?: number;
  skip?: number;
}

export class ItemListResult<T> {
  size: number;
  take: number;
  skip: number;

  items: List<T>
}
