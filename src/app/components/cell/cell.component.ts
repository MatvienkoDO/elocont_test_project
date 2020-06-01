import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  host: { '(click)': 'onClickWholeCell()' }
})
export class CellComponent implements OnInit, OnChanges {
  @Input() data: any = undefined;
  @Input() changable = true;

  @Output() update = new EventEmitter<any>();

  public isChanging = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const changable = changes.changable;

    if (changable && changable.previousValue && !changable.currentValue) {
      this.isChanging = false;
    }
  }

  ngOnInit() {
  }

  onClickWholeCell() {
    // markForCheck
    this.isChanging = true;
  }

  onInputLoseFocus() {
    // markForCheck
    this.isChanging = false;
  }

  submit(event) {
    // markForCheck
    this.isChanging = false;

    const value = event.target[0].value;

    if (value != this.data) {
      this.data = value;
      this.update.emit(value);
    }

    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}
