import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
