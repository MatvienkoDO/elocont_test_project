import { Component, OnInit, Input } from '@angular/core';

import { Column } from '../../interfaces/column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columns: Column[] = [];
  @Input() data: object[] = [];

  constructor() { }

  ngOnInit() {
  }
  
}
