import { Component, OnInit, Input, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

import { Column } from '../../interfaces/column';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit, OnChanges {
  @Input() index: number = NaN;
  @Input() columns: Column[] = [];
  @Input() data: object = {};
  @Input('is-header') isHeader = false;
  @Input() deletable = true;

  @HostBinding('class.deletable') deletableClass = true;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.deletable) {
      this.deletableClass = changes.deletable.currentValue;
    }
  }

  ngOnInit() {
  }

}
