import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Column } from '../../interfaces/column';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {
  @Input() index: number = NaN;
  @Input() columns: Column[] = [];
  @Input() data: object = {};
  @Input('is-header') isHeader = false;
  @Input() deletable = true;

  @Output() delete = new EventEmitter<number>();
  @Output('update-cell') updateCell = new EventEmitter<{ columnKey: string, data: any }>();

  constructor() { }

  ngOnInit() {
  }

  public updateCellCallback(columnKey: string, data: any) {
    this.updateCell.emit({
      columnKey,
      data
    });
  }
}
