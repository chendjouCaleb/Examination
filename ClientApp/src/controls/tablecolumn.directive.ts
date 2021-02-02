import {Directive, Input, OnInit} from "@angular/core";
import {MsTable} from "@ms-fluent/table";
import {MsfCheckboxGroup} from "fabric-docs";
export interface TableColumn {

}
const STORAGE_KEY = 'TABLE_COLUMNS';
@Directive({
  selector: 'MsfCheckboxGroup[msTableColumnHandler]',

})
export class TableColumnDirective {
  @Input()
  key: string;

  @Input()
  table: MsTable;

  tableColumns: any = {};
  checkedColumns: string[];


  constructor(private checkboxGroup: MsfCheckboxGroup) {
    const value = localStorage.getItem(STORAGE_KEY);

    try {
      this.tableColumns = JSON.parse(value);
    }catch (e) {
      this.tableColumns = {};
    }
    if(!this.tableColumns) {
      this.tableColumns = {};
    }
  }

  ngOnInit(): void {
    if(this.tableColumns[this.key]) {
      this.checkedColumns = this.tableColumns[this.key];
    }

    setTimeout(() => {
      if(!this.checkedColumns) {
        this.checkboxGroup._checkboxChildren.forEach(item => item.checked = true);
        this.checkedColumns = this.checkboxGroup._checkboxChildren.map(item => item.value);
      }else {
        const checked = this.checkboxGroup._checkboxChildren.filter(c => this.checkedColumns.indexOf(c.value) > -1);
          checked.forEach(item => item.checked = true);
        this.table.visibleColumns = checked.map(item => item.value);
      }
    }, 100);
    this.checkboxGroup.change.subscribe(() => {
      if(this.table) {
        this.table.setVisibleColumns(this.getVisibleColumns());
        this.persist();
      }
    })
  }

  getVisibleColumns() {
    return this.checkboxGroup.checkboxItems.items.findAll(i => i.checked).convertAll(i => i.value).toArray()
  }

  persist() {
    this.tableColumns[this.key] = this.getVisibleColumns();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tableColumns));
  }
}
