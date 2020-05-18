export interface PeriodicElement {
  id?: number,
  name?: string;
  position?: number;
  weight?: number;
  symbol?: string;
  type?: string
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {id: 0, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', type: 'Reactive nonmetal'},
  {id: 1, position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', type: 'Noble gas'},
  {id: 2, position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', type: 'Alkali metal'},
  {id: 3, position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', type: 'Alkaline earth metal'},
  {id: 4, position: 5, name: 'Boron', weight: 10.811, symbol: 'B', type: 'Metalloid'},
  {id: 5, position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', type: 'Reactive nonmetal'},
  {id: 6, position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', type: 'Reactive nonmetal'},
  {id: 7, position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', type: 'Reactive nonmetal'},
  {id: 8, position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', type: 'Reactive nonmetal'},
  {id: 9, position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', type: 'Noble gas'},
];

export const ELEMENT_TYPES: string[] = ['Reactive nonmetal', 'Noble gas', 'Alkali metal', 'Alkaline earth metal', 'Metalloid'];
