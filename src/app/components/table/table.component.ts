import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Column } from '../../interfaces/column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columns: Column[] = [];
  @Input() data: object[] = [];

  @Output('row-delete') rowDelete = new EventEmitter<number>();
  @Output('update-cell') updateCell = new EventEmitter<{ rowIndex: number, columnKey: string, data: any }>();
  @Output('new-row') newRow = new EventEmitter<any>();

  public newRowData: any = {};

  constructor() { }

  ngOnInit() {
  }

  public updateCellCallback(rowIndex: number, { columnKey, data }) {
    this.updateCell.emit({
      rowIndex,
      columnKey,
      data
    });
  }

  public updateNewCell({ columnKey, data }) {
    this.newRowData[columnKey] = data;
  }

  public createNewRow() {
    this.newRow.emit(this.newRowData);
    this.newRowData = {};
  }
  
}
